const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const _ = require('lodash');

//Provides token for user that can be tracked by our app
function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}


exports.userInfo;

exports.signin = function(req, res, next) {
	//User has already had their email and password auth'd
	// We just need to give them
	let userData = res.socket._httpMessage.req.user;

	let userTest = {
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email
	}
	userInfo = userTest;
	res.send({
		token: tokenForUser(req.user),
		data:{
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email
	}
	});
	console.log("res.body", res.socket._httpMessage.req.user.firstName);
	console.log("userData", userData);
}

//Signup function
exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const companyName = req.body.companyName;
	const fbHandle = req.body.fbHandle;

	console.log("MADE it to signup function");

	if(!email || !password) {
		return res.status(422).send({error: 'You must provide email and password'});
	}

	//See if a user with a given email exists
	User.findOne({ email: email }, function(err, existingUser) {
		if(err) { return next(err); }

		//If a user with email does exist, return an error
		if(existingUser) {
			return res.status(422).send({ error: 'Email is already in use'});
		}

		//If a user with email DOESN'T exist. create and save record
		const user = new User({
			email: email,
			password: password,
			firstName: firstName,
			lastName: lastName,
			companyName: companyName,
			fbHandle: fbHandle
		});

		user.save(function(err) {
			console.log("made it to save function")
			if (err) { return next(err); }

			// Respond to request indicating the user was created
			res.json({token: tokenForUser(user)});
		});
	});
}
