const Timesheet = require('../models/timesheet');
const TestTimesheet = require('../models/timesheet2');
const _ = require('lodash');
const moment = require('moment');
const mongoose = require('mongoose');

// GET (all) method for timesheet
exports.getTime = function(req, res, next) {
    Timesheet.find(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
};

// GET by user name (temporary)
exports.getTimeByUser = function(req, res, next) {
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

// gets data for specific timesheet
// searches for the user (req.params.id) and the week (req.params.week)
exports.TESTgetime = function(req, res, next) {
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

exports.TESTpostTime = function(req, res, next){

    // const userInfo = req.body.userInfo;
    // req.body = _.omit(req.body, 'userInfo');
    // let testArray = [];
    //     _.forEach(req.body, (value, key) => {
    //         value.userInfo = userInfo;
    //         testArray.push(value);
    //     });
    // let str= JSON.stringify(testArray);
    // str = str.replace(/"monDev":|"tueDev":|"wedDev":|"thurDev":|"friDev":|"satDev":|"sunDev":/g, '"dev":');
    // str = str.replace(/"monQa":|"tueQa":|"wedQa":|"thurQa":|"friQa":|"satQa":|"sunQa":/g, '"qa":');
    // let objectTest = JSON.parse(str);
    
    // console.log('i got the response', objectTest);

    _.forEach(req.body, (value, key) => {
            if (!value._id) {
                value._id = new mongoose.mongo.ObjectID();
            }
            TestTimesheet.update(
                {"_id": value._id},
                {"$set": {"dev": value.dev, "qa": value.qa, "dateWorked": value.dateWorked, "userInfo": value.userInfo}},
                {upsert: true}, onInsert);
    });
    // https://docs.mongodb.com/v3.2/reference/method/db.collection.update/
    // testArray.forEach(function(data) {
    //     TestTimesheet.update({"_id": data._id}, {"$set": {"dev": data.dev, "qa": data.qa }}, onInsert);
    // })
        
    function onInsert(err, docs){
        if(err){
            console.log(err);
        } else {
            console.log('docs were stored', docs.length);
        }
    } 
}

exports.deleteTime = function(req, res, next) {
    Timesheet.findByIdAndRemove(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
}
