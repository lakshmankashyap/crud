const mongoose = require('mongoose')
const _ = require('lodash')
const Student = require('../../model/student')

module.exports = {

	// create student API

	deleteStudent: (req, res) => {
		try {
			const { email } = req.params

			// find student into database
			Student.findOneAndDelete({ email }).then((data) => {
				console.log(data)
				if (!data) {
					console.log('no user found')
					res.json({
						status: false,
						message: 'student doest not exist',
					})
				} else {
					res.json({
						status: true,
						message: 'student deleted successfully',
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
