const chai = require('chai')
const chaiHttp = require('chai-http')

const Student = require('../model/student')

// Require the dev-dependencies
const server = require('../app')


chai.use(chaiHttp)
// Our parent block
describe('Student', () => {
	// beforeEach((done) => { //Before each test we empty the database
	//     Student.remove({}, (err) => {
	//         done();
	//     });
	// });


	/*
	* Test the /POST route
	*/
	describe('/POST student', () => {
		it('it Should create student in DB', (done) => {
			const student = {
				fullname: 'test',
				email: 'test@gmail.com',
				age: 6,
				gender: 'm',
				motherName: 'test',
				fatherName: 'test',
				class: '10th',
			}

			chai.request(server)
				.post('/createStudent')
				.send(student)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.status.should.be.equal(true)
					console.log('Response Body:', res.body)
					done()
				})
		})
	})
	/*
	* Test the /GET route
	*/
	describe('/GET students', () => {
		it('it should GET all the student', (done) => {
			chai.request(server)
				.get('/getAllStudentsDetails')
				.end((err, res) => {
					res.should.have.status(200)
					console.log('Got', res.body.data.length, ' docs')
					res.body.data.should.be.a('array')
					done()
				})
		})
	})
	/*
	* Test the /GET route
	*/
	describe('/GET/:email student', () => {
		it('it should GET a student by the given id', (done) => {
			const student = new Student({
				fullname: 'testid',
				email: 'testid@gmail.com',
				age: 6,
				gender: 'm',
				motherName: 'test',
				fatherName: 'test',
				class: '10th',
			})
			student.save((err, student) => {
				chai.request(server)
					.get(`/getStudentDetail/${student.email}`)
					.end((err, res) => {
						res.should.have.status(200)
						res.body.status.should.be.equal(true)
						res.body.Student_Details.should.be.a('object')
						res.body.Student_Details.should.have.property('_id').eql(student.id)
						done()
					})
			})
		})
	})
	/*
	* Test the /PUT/:id route
	*/
	describe('/PUT/:id student', () => {
		it('it should UPDATE a student given the email', (done) => {
			const student = new Student({
				fullname: 'testidupdate',
				email: 'testidupdate@gmail.com',
				age: 6,
				gender: 'm',
				motherName: 'test',
				fatherName: 'test',
				class: '10th',
			})
			student.save((err, student) => {
				chai.request(server)
					.put(`/updateStudent/${student.email}`)
					.send({
						age: 10,
						gender: 'f',
						motherName: 'testm',
						fatherName: 'testf',
						class: '5th',
					})
					.end((err, res) => {
						res.should.have.status(200)
						res.body.should.be.a('object')
						res.body.should.have.property('message').eql('student details updated successfull')
						done()
					})
			})
		})
	})
	/*
	* Test the /DELETE/:id route
	*/
	describe('/DELETE/:id student', () => {
		it('it should DELETE a student given the id', (done) => {
			const student = new Student({
				fullname: 'testiddelete',
				email: 'testiddelete@gmail.com',
				age: 6,
				gender: 'm',
				motherName: 'test',
				fatherName: 'test',
				class: '10th',
			})
			student.save((err, student) => {
				chai.request(server)
					.delete(`/deleteStudent/${student.email}`)
					.end((err, res) => {
						res.should.have.status(200)
						res.body.should.be.a('object')
						res.body.should.have.property('message').eql('student deleted successfully')
						done()
					})
			})
		})
	})
	/*
	* Test the /search/
	*/
	describe('search params student', () => {
		it('it should search student given the params', (done) => {
			const student = new Student({
				fullname: 'testid',
				email: 'testid@gmail.com',
				age: 6,
				gender: 'm',
				motherName: 'test',
				fatherName: 'test',
				class: '10th',
			},
			{
				fullname: 'testidupdate',
				email: 'testidupdate@gmail.com',
				age: 6,
				gender: 'm',
				motherName: 'test',
				fatherName: 'test',
				class: '10th',
			})
			console.log(student, 'student')
			student.save((err, student) => {
				const searchParam = {
					fullname: 'testidupdate',
				}
				chai.request(server)
					.post('/search/')
					.send(searchParam)
					.end((err, res) => {
						res.should.have.status(200)
						console.log(res.body, 'search data')
						res.body.should.have.property('msg').eql('Student fetch successfully')
						done()
					})
			})
		})
	})
})
