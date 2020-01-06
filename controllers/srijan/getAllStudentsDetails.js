const mongoose = require('mongoose')
const _ = require('lodash')
const Student = require('../../model/student')

module.exports = {

	// create student API

	getAllStudentsDetails: (req, res) => {
		try {
			const { email } = req.params

			// find student into database
			Student.find({}).then((data) => {
				if (data.length === 0) {
					res.json({
						status: false,
						message: 'No student in the database',
						data: [],
					})
				} else {
					res.json({
						status: true,
						message: 'All students details',
						data,
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
