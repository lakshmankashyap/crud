const mongoose = require('mongoose')
const _ = require('lodash')
const Student = require('../../model/student')

module.exports = {

	// create student API

	updateStudent: (req, res) => {
		console.log('STUDENT API', req.params)
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
					const keys = Object.keys(req.body)
					keys.forEach((key) => {
						data[key] = req.body[key]
					})
					data.save((err, saved) => {
						if (err) {
							return res.json({
								status: false,
								message: 'error while saving',
							})
						}
						res.json({
							status: true,
							message: 'student details updated successfull',
						})
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
