const Student = require('../../model/student');
const mongoose = require('mongoose')
var _ = require('lodash');

module.exports = {
    // create student API

    getStudentDetail: (req, res) => {
        try {
            let email = req.params.email;

            // find student into database
            Student.findOne({ "email": email }).then((data) => {
                if (!data) {
                    res.json({
                        "status": false,
                        "message": "student doest not exist"
                    })
                } else {

                    res.json({
                        "status": true,
                        "message": "student details",
                        "Student_Details": data
                    })

                }
            })
        } catch (e) {
            console.log(e)
            res.json({
                "status": "error",
                "msg": "error encountered"
            });
        }
    }
}