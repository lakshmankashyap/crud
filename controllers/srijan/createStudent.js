const Student = require('../../model/student');
const mongoose = require('mongoose')
var _ = require('lodash');

module.exports = {

    // create student API

    createStudent: (req, res) => {
        console.log('STUDENT API', req.body)
        try {
            req.checkBody({
                'fullname': {
                    notEmpty: true,
                    isLength: {
                        options: [{ min: 3, max: 20 }],
                        errorMessage: 'Invalid full name, length should be in between 3 to 20 characters'
                    },
                    errorMessage: 'Please enter your full name'
                },
                'email': {
                    notEmpty: true,
                    isEmail: true,
                    isLength: {
                        options: [{ min: 5, max: 50 }],
                        errorMessage: 'Invalid email address, length should be in between 5 to 50 characters'
                    },
                    errorMessage: 'Please fill valid Email '
                },
                'age': {
                    notEmpty: true,
                    isNumeric: true,
                    isLength: {
                        options: [{ min: 1, max: 2 }],
                        errorMessage: 'Job Type Should Not be a Number'
                    },
                    errorMessage: 'Provide the Pay Rate'
                },
                "gender": {
                    notEmpty: true,
                    errorMessage: 'Please enter gender'
                },
                "motherName": {
                    notEmpty: true,
                    isLength: {
                        options: [{ min: 3, max: 20 }],
                        errorMessage: 'erroor in mother name, length should be in between 3 to 50 characters'
                    },
                    errorMessage: "Please enter your Mother's name"
                },
                "fatherName": {
                    notEmpty: true,
                    isLength: {
                        options: [{ min: 3, max: 50 }],
                        errorMessage: 'error in father name, length should be in between 3 to 50 characters'
                    },
                    errorMessage: "Please enter your Father's name"
                },
                "class": {
                    notEmpty: true,
                    errorMessage: "Please enter class/standard of student, studying in"
                }
            });

            const errors = req.validationErrors();
            if (errors) {
                var errorsMessage = [];
                errors.forEach(function (err) {
                    errorsMessage.push(err.msg);
                });

                res.json({
                    "status": "error",
                    "msg": errorsMessage[0]
                });
            } else {
                Student.findOne({ email: req.body.email }).then((studentData) => {
                    console.log('student data', studentData)
                    if (studentData) {
                        console.log('already exists', studentData)
                        res.json({ status: false, message: "student already exists." })
                    } else {
                        var student = new Student({
                            fullname: req.body.fullname,
                            email: req.body.email,
                            age: req.body.age,
                            gender: req.body.gender,
                            motherName: req.body.motherName,
                            fatherName: req.body.fatherName,
                            class: req.body.class
                        })
                        student.save(function (err, saved) {
                            if (err) {
                                console.log('err', err)
                                res.json({ status: false, message: "error occured" })
                            } else {
                                res.json({ status: true, message: "student created" })
                            }
                        });
                    }
                })
            }
        } catch (e) {
            res.json({
                "status": "error",
                "msg": "error encountered"
            });
        }
    },
}