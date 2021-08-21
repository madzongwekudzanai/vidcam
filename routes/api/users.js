const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
const nodemailer = require('nodemailer');

const User = require('../../models/User');
const Admin = require('../../models/Admin');
const Photographer = require('../../models/Photographer');

// @router  POST api/users
// @desc    Register user
// @access  Public
router.post('/', async (req, res) => {
	const { name, email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
		}

		const avatar = gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'mm',
		});

		user = new User({
			name,
			email,
			avatar,
			password,
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			const output = `
          <h1>Welcome ${name},</h1>
          <h2>Welcome to Vidcam</h2>
          <p>Please click the link below to complete your registration<p/>
          <a href="https://sleepy-gorge-55560.herokuapp.com/auth-user/${token}">verify email</>
        `;

			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: myEmail,
					pass: myPassword,
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			let mailOptions = {
				from: 'Account verification kudziemadzongwe6@gmail.com',
				to: email,
				subject: 'Verify Email',
				html: output,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					res.json('Thank you, your email has been sent');
					console.log('Email sent: ' + info.response);
				}
			});
			res.json('Thank you, please verify your email');
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @router  POST api/users/photographer
// @desc    Register photographer
// @access  Public
router.post('/photographer', async (req, res) => {
	const { name, email, password } = req.body;

	try {
		let user = await Photographer.findOne({ email });

		if (user) {
			return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
		}

		const avatar = gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'mm',
		});

		user = new Photographer({
			name,
			email,
			avatar,
			password,
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			photographer: {
				id: user.id,
			},
		};

		jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			const output = `
          <h1>Welcome ${name},</h1>
          <h2>Welcome to Vidcam</h2>
          <p>Please click the link below to complete your registration<p/>
          <a href="https://sleepy-gorge-55560.herokuapp.com/auth-photographer/${token}">verify email</>
        `;

			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: myEmail,
					pass: myPassword,
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			let mailOptions = {
				from: 'Account verification kudziemadzongwe6@gmail.com',
				to: email,
				subject: 'Verify Email',
				html: output,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					res.json('Thank you, your email has been sent');
					console.log('Email sent: ' + info.response);
				}
			});
			res.json('Thank you, please verify your email');
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @router  POST api/users/admin
// @desc    Register admin
// @access  Public
router.post('/admin', async (req, res) => {
	const { name, email, password } = req.body;

	try {
		let user = await Admin.findOne({ email });

		if (user) {
			return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
		}

		const avatar = gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'mm',
		});

		user = new Admin({
			name,
			email,
			avatar,
			password,
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			admin: {
				id: user.id,
			},
		};

		jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			const output = `
          <h1>Welcome ${name},</h1>
          <h2>Welcome to Vidcam</h2>
          <p>Please click the link below to complete your registration<p/>
          <a href="https://sleepy-gorge-55560.herokuapp.com/auth-user/${token}">verify email</>
        `;

			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: myEmail,
					pass: myPassword,
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			let mailOptions = {
				from: 'Admin verification kudziemadzongwe6@gmail.com',
				to: email,
				subject: 'Verify Email',
				html: output,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					res.json('Thank you, your email has been sent');
					console.log('Email sent: ' + info.response);
				}
			});
			res.json('Thank you, please verify your email');
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
