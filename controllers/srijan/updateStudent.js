const Student = require('../../model/student');
const mongoose = require('mongoose')
var _ = require('lodash');

module.exports = {

    // create student API

    updateStudent: (req, res) => {
        console.log('STUDENT API', req.params)
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
                    let keys = Object.keys(req.body);
                    keys.forEach(key => {
                        data[key] = req.body[key];
                    });
                    data.save((err, saved) => {
                        if (err) {
                            return res.json({
                                "status": false,
                                "message": "error while saving"
                            })
                        } else {
                            res.json({
                                "status": true,
                                "message": "student details updated successfull"
                            })
                        }
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