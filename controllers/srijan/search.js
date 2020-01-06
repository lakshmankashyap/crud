const mongoose = require('mongoose')
const _ = require('lodash')
const Student = require('../../model/student')

module.exports = {


	search: (req, res) => {
		try {
			const params = []
			console.log(req.body)
			if (req.body.fullname != '') {
				params.push({
					fullname: { $regex: new RegExp(req.body.fullname, 'i') },
				})
			}

			if (req.body.email != '') {
				params.push({
					email: { $regex: new RegExp(req.body.email, 'i') },
				})
			}
			if (req.body.gender != '') {
				params.push({
					gender: { $regex: new RegExp(req.body.gender, 'i') },
				})
			}
			if (req.body.motherName != '') {
				params.push({
					motherName: { $regex: new RegExp(req.body.motherName, 'i') },
				})
			}
			if (req.body.fatherName != '') {
				params.push({
					fatherName: { $regex: new RegExp(req.body.fatherName, 'i') },
				})
			}
			const query = { $and: params }
			const queryString = params.length === 0 ? {} : query
			// find student into database
			Student.find(queryString).then((data) => {
				if (data.length > 0) {
					res.json({
						status: 'success',
						msg: 'Student fetch successfully',
						students: data,
					})
				} else {
					res.json({
						status: 'success',
						msg: 'Student fetch successfully',
						students: [],
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
