import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
	try {
		const { firstName, email, password } = req.body;

		//Check if user already exist
		let existingUser = await userModel.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ message: "User already exist" });
		}

		const newUser = new userModel({
			firstName,
			email,
			password,
		});

		//Hash the password
		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(password, salt);

		await newUser.save();

		//Create a JWT
		const payload = {
			newUser: {
				id: newUser._id,
				name: newUser.firstName,
			},
		};

		jwt.sign(payload, "randomString", { expiresIn: "1h" }, (err, token) => {
			if (err) throw err;
			res.status(200).json({ token });
		});
	} catch (error) {
		res.json(error.stack);
	}
};

export const userLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await userModel.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Password incorrect!" });
		}

		//Cretae JWT
		const payload = {
			user: {
				id: user._id,
				name: user.firstName,
			},
		};

		jwt.sign(payload, "randomString", { expiresIn: "1h" }, (err, token) => {
			if (err) throw err;
			res.cookie("token", {token},{httpOnly: true} );
			res.status(200).json("user logged in");

		});
	} catch (error) {
		res.json(error.stack);
	}
};

export const loggedIn = async (req, res) => {
	try {
		const user = await userModel.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		res.json(error.stack);
	}
};

export const cookieUser = async (req, res) => {

	const payload = {
		user: {
			id: 1,
			name: "Slawomir",
		},
	};

	jwt.sign(payload, "randomString", { expiresIn: "1h" }, (err, token) => {
		if (err) throw err;
		res.cookie("Hello", { token }, {
			//maxAge: 60000 = 1 min or 60000 *60 = 1 hour
			httpOnly: true,
			secure: true,
		});
		res.status(200).json("saysomething");
	});


	// res.send("Cookie set!");
};

export const getProducts = async (req, res) => {
	//console.log(req.headers.cookie);
	//console.log(req.cookies.Hello);
	if (req.cookies.Hello && req.cookies.Hello === "Slawomir!") {
		return res.send("User is valid!");
	} else {
		return res.send("User is not valid!");
	}
};