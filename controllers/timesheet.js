const Timesheet = require('../models/timesheet'); // will be depricated soon
const TestTimesheet = require('../models/timesheet2');
const _ = require('lodash');
const moment = require('moment');
const mongoose = require('mongoose');

// gets data for specific timesheet
// searches for the user (req.params.id) and the week (req.params.week)
// query is also sorted in ascending order (monday is req.body[0] while sunday is req.body[6])
exports.getTime = function(req, res, next) {
    console.log('req.params.id', req.params.id);
    console.log('req.params.week', moment(req.params.week).format());
    TestTimesheet.find({
        'userInfo.sub': req.params.id,
        'dateWorked': {
            "$gte": moment(req.params.week).format(),
            '$lt': moment(req.params.week).add(1, 'week').format()}
        },
        function (err, data) {
        if (err) return next(err);
        res.json(data);
        console.log('return data', data);
    }).sort({'dateWorked': 1});

    console.log('req.body', req.params.id);
}

exports.getTime2 = function(req, res, next) {
    console.log('req.params.id', req.params.id);
    TestTimesheet.find({
        'userInfo.sub': req.params.id
        },
        function (err, data) {
        if (err) return next(err);
        res.json(data);
        console.log('return data', data);
    }).sort({'dateWorked': 1});

    console.log('req.body', req.params.id);
}

exports.postTime = function(req, res, next){
    _.forEach(req.body, (value, key) => {
            if (!value._id) {
                value._id = new mongoose.mongo.ObjectID();
            }
            TestTimesheet.update(
                {"_id": value._id},
                {"$set": {
                    "dev": value.dev,
                    "qa": value.qa,
                    "rd": value.rd,
                    "other": value.other,
                    "admin": value.admin,
                    "dateWorked": value.dateWorked,
                    "userInfo": value.userInfo}},
                {upsert: true}, onInsert);
    });
        
    function onInsert(err, docs){
        if(err){
            console.log(err);
        } else {
            console.log('docs were stored', docs.length);
        }
    } 
}

// GET (all) method for timesheet
exports.OLDgetTime = function(req, res, next) {
    Timesheet.find(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
};

// GET by user name (temporary)
exports.OLDgetTimeByUser = function(req, res, next) {
    Timesheet.find({'userInfo.sub': req.params.id}, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
}

//POST method for timesheet
exports.OLDpostTime = function(req, res, next) {
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

exports.OLDdeleteTime = function(req, res, next) {
    Timesheet.findByIdAndRemove(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
}
