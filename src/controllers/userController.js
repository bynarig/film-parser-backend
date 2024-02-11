import UserService from "#services/user/UserService.js";

class UserController {
	async register(req, res, next) {
    try {
      const { email, password, username, phone} = req.body;
      const { UserModel } = req.models;
      const { writeData } = req;
      await UserService.register(
        email,
        password,
        username,
        phone,
        UserModel,
        writeData
      );
      res
        .status(200)
        .json({ status: 200, message: "Code sended to user email" });
    } catch (err) {
      next(err);
    }
  }

	// register(req, res, next) {
	// 	 // TODO: create register logic with all checks
	// 	console.log(req.body);
	// 	res.send("response")
	// }
}

export default new UserController();