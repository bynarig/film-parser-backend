class UserController {

	register(req, res, next) {
		 // TODO: create register logic with all checks
		console.log(req.body);
		res.send("response")
	}
}

export default new UserController();