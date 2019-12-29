const Student = require('../../model/student');
const mongoose = require('mongoose')
var _ = require('lodash');

module.exports = {

    // create student API

    deleteStudent: (req, res) => {
        try {
            let email = req.params.email;

            // find student into database
            Student.findOneAndDelete({ "email": email }).then((data) => {
                console.log(data)
                if (!data) {
                    console.log('no user found')
                    res.json({
                        "status": false,
                        "message": "student doest not exist"
                    })
                } else {
                    res.json({
                        "status": true,
                        "message": "student deleted successfully"
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