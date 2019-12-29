const Student = require('../../model/student');
const mongoose = require('mongoose')
var _ = require('lodash');

module.exports = {

    // create student API

    getAllStudentsDetails: (req, res) => {
        try {
            let email = req.params.email;

            // find student into database
            Student.find({}).then((data) => {
                if (data.length === 0) {
                    res.json({
                        "status": false,
                        "message": "No student in the database",
                        "data":[]
                    })
                } else {
                    res.json({
                        "status": true,
                        "message": "All students details",
                        data
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