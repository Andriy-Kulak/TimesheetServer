const Timesheet = require('../models/timesheet');
const userInfo = require('./authentication.js');

// GET (all) method for timesheet
exports.getTime = function(req, res, next) {
    Timesheet.find(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
};

// GET by user name (temporary)
exports.getTimeByUser = function(req, res, next) {
    Timesheet.find({name: req.params.name}, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
}

//POST method for timesheet
exports.postTime = function(req, res, next) {
	const name = req.body.name;
    const dateWorked = req.body.dateWorked;
    const hoursWorked = req.body.hoursWorked;
    const workType = req.body.workType;

    const timesheet = new Timesheet({
        name: name,
        dateWorked: dateWorked,
        hoursWorked: hoursWorked,
        workType: workType
    });
    console.log('userInfo', userInfo);

    timesheet.save(req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
}

exports.deleteTime = function(req, res, next) {
    Timesheet.findByIdAndRemove(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
}
