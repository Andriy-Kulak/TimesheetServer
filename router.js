const passport = require('passport');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const mongoose = require('mongoose');
const TimeController = require('./controllers/timesheet');

//by default, passport tries to provide a session cookie, so we are setting it to false
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false}); 

module.exports = function(app) {
	// auth API endpoints
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Super secret code is ABC123'});
	});
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);

	// Timesheet API endpoints
	app.post('/api/v1/timesheet', TimeController.postTime);
	app.get('/api/v1/timesheet', TimeController.getTime);
	app.get('/api/v1/timesheet/:id', TimeController.getTimeByUser);
	app.delete('/api/v1/timesheet/:id', TimeController.deleteTime);

}