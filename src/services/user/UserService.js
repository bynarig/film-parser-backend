import bcrypt from "bcrypt";
import tokenService from "../TokenService.js";
import UserDto from "#dtos/UserDto.js";
import mailer from "#utils/nodemailer.js";
import codeGenerator from "#utils/codeGenerator.js";
import JWT from "#utils/jwt.js";
import { ValidationError, NotFoundError } from "#utils/errors.js";

class UserService {
  // register
  async register(email, password, username, phone, userModel, writeData) {
    try {
      const person = await userModel.findOne({ email });
      if (person) {
        throw new ValidationError(400, "This user is exist");
      }
      const hashedPassword = await bcrypt.hash(password, 3);
      let code = codeGenerator();

      writeData(email, { email, password: hashedPassword, username, code: code });

      await mailer(email, code)
    } catch (error) {
      throw error;
    }
  }
  async checkCode(email, code, userModel, tokenModel, readData, deleteData) {
    try {
      let currentUser = await readData(email);

      if (currentUser && currentUser.code == code) {
        deleteData(email);

        const user = await userModel.create({
          email: currentUser.email,
          password: currentUser.password,
          username: currentUser.username,
          isActivated: true,
          roles: ["USER"]
        });
        const userDto = new UserDto(user);
        const tokens = {
          accesToken: JWT.sign({ ...userDto }),
          refreshToken: JWT.refresh({ ...userDto }),
        };
        await tokenService.saveToken(userDto.id, tokens.refreshToken, tokenModel);
        return { ...tokens, userDto };
      } else {
        throw new ValidationError(400, "Code does not match");
      }
    } catch (error) {
      throw error;
    }
  }
  // login
  async login(email, password, userModel, tokenModel) {
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new NotFoundError(400, "The user is not found");
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        throw new ValidationError(400, "Code does not match");
      }
      const userDto = new UserDto(user);
      const tokens = { accesToken: JWT.sign({ ...userDto }), refreshToken: JWT.refresh({ ...userDto }) };
      await tokenService.saveToken(userDto.id, tokens.refreshToken, tokenModel);
      return { ...tokens, userDto };
    } catch (error) {
      throw error;
    }
  }

  // logout
  async logout(refreshToken, tokenModel){
    const token = await tokenService.removeToken(refreshToken, tokenModel)
    return token
  }

  // restoreEmail
  async restoreEmail(email, userModel, writeData) {
    try {
      const person = await userModel.findOne({ email });
      if (!person) {
        throw new NotFoundError(400, "The user is not found");
      }
      let code = codeGenerator();

      writeData(email, { code: code, accepted: false  });

      mailer(email, code);
    } catch (error) {
      throw error;
    }
  }
  // restoreCode
  async restoreCode(email, code, readData, writeData) {
    try {
      let currentUser = await readData(email);

      if (!currentUser) {
        throw new NotFoundError(400, "The user is not found");
      }
      if (!(currentUser.code == code)) {
        throw new ValidationError(400, "Code does not match");
      }

      writeData(email, { code: code, accepted: true  });
    } catch (error) {
      throw error;
    }
  }
  // restorePassword
  async restorePassword(email, password, userModel, tokenModel, readData, deleteData) {
    try {
      let currentUser = await readData(email);

      if (!currentUser || !currentUser.accepted) {
        throw new NotFoundError(400, "The user is not found");
      }
      deleteData(email)

      let user = await userModel.findOneAndUpdate({email}, {password})
      const userDto = new UserDto(user);
      const tokens = { accesToken: JWT.sign({ ...userDto }), refreshToken: JWT.refresh({ ...userDto }) };

      await tokenService.saveToken(userDto.id, tokens.refreshToken, tokenModel);
      return { ...tokens, userDto };

    } catch (error) {
      throw error;
    }
  }
  async refresh(refreshToken, tokenModel, userModel){
    if(!refreshToken){
      throw new NotFoundError(400, "The user is not found")
    }
    const validToken = tokenService.validateRefreshToken(refreshToken)
    const findTokenInDb = await tokenService.findToken(refreshToken, tokenModel)
    if(!validToken || !findTokenInDb){
      throw new NotFoundError(400, "The user is not found")
    }
    const user = await userModel.findById(validToken.id)
    const userDto = new UserDto(user);
    const tokens = { accesToken: JWT.sign({ ...userDto }), refreshToken: JWT.refresh({ ...userDto }) };
    await tokenService.saveToken(userDto.id, tokens.refreshToken, tokenModel);
    return { ...tokens, userDto };
  }
}

export default new UserService();