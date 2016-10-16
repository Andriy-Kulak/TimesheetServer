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
    var test123 = parseInt(req.params.id);
    console.log('test123', test123);
    Timesheet.find({'userInfo.sub': req.params.id}, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
}

//POST method for timesheet
exports.postTime = function(req, res, next) {
    const dateWorked = req.body.dateWorked;
    const hoursWorked = req.body.hoursWorked;
    const workType = req.body.workType;
    const userInfo = req.body.userInfo;

    const timesheet = new Timesheet({
        dateWorked: dateWorked,
        hoursWorked: hoursWorked,
        workType: workType,
        userInfo: userInfo
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
