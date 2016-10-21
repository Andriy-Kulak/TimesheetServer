const Timesheet = require('../models/timesheet');
const TestTimesheet = require('../models/timesheet2');
const _ = require('lodash');

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

exports.TESTgetime = function(req, res, next) {
    TestTimesheet.find({'userInfo.sub': req.params.id}, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
}

exports.TESTpostTime = function(req, res, next){
    const userInfo = req.body.userInfo;
    req.body = _.omit(req.body, 'userInfo');
    let testArray = [];
        _.forEach(req.body, (value, key) => {
            value.userInfo = userInfo;
            testArray.push(value);
        });
    let str= JSON.stringify(testArray);
    str = str.replace(/"monDev":|"tueDev":|"wedDev":|"thurDev":|"friDev":|"satDev":|"sunDev":/g, '"dev":');
    str = str.replace(/"monQa":|"tueQa":|"wedQa":|"thurQa":|"friQa":|"satQa":|"sunQa":/g, '"qa":');
    let objectTest = JSON.parse(str);
    
    // console.log('i got the response', objectTest);

    TestTimesheet.insertMany(objectTest, onInsert);

    // TestTimesheet.updateMany(
    //     {'dateWorked': objectTest.dateWorked},
    //     objectTest,
    //     {upsert: true});
    // let dateArray = [];
    // objectTest.map(function(obj){
    //     return dateArray.push(obj.dateWorked);
    // });
    // console.log('test', dateArray);
    // Timesheet.find({
    //     'dateWorked': {$in:[dateArray]}
    // }, function (err, data) {
    //     if (err) return next(err);
    //     console.log(res.json(data.body));
    // });
        
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
