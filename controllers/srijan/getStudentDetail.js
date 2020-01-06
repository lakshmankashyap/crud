const mongoose = require('mongoose')
const _ = require('lodash')
const Student = require('../../model/student')

module.exports = {
	// create student API

	getStudentDetail: (req, res) => {
		try {
			const { email } = req.params

			// find student into database
			Student.findOne({ email }).then((data) => {
				if (!data) {
					res.json({
						status: false,
						message: 'student doest not exist',
					})
				} else {
					res.json({
						status: true,
						message: 'student details',
						Student_Details: data,
					})
				}
			})
		} catch (e) {
			console.log(e)
			res.json({
				status: 'error',
				msg: 'error encountered',
			})
		}
	},
}
