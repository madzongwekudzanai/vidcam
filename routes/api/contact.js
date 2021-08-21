const express = require('express');
const router = express.Router();
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;
const nodemailer = require('nodemailer');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route    POST api/contact
// @desc     Send email
// @access   Public
router.post('/', async (req, res) => {
	const output = `
          <p>You have a new contact request</p>
          <h3>Contact Details</h3>
          <ul>  
            <li>name: ${req.body.name}</li>
            <li>email: ${req.body.email}</li>
            <li>subject: ${req.body.subject}</li>
          </ul>
          <h3>message</h3>
          <p>${req.body.message}</p>
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
		from: myEmail,
		to: 'kudziemadzongwe6@gmail.com',
		subject: 'Contact request',
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
});

// @route    POST api/contact/newsletter
// @desc     Send newsletter email
// @access   Public
router.post('/newsletter', async (req, res) => {
	const output = `
          <p>You have a new newsletter subscription</p>
          <h3>Newsletter Subscription</h3>
          <ul>  
            <li>Email: ${req.body.email}</li>
          </ul>
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
		from: myEmail,
		to: 'kudziemadzongwe6@gmail.com',
		subject: 'Newsletter Subscription',
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
});

// @route    POST api/contact/message
// @desc     Message photographer
// @access   Private
router.post('/message', auth, async (req, res) => {
	const user = await User.findById(req.user.id).select('-password');
	const output = `
          <p>You have a new contact request</p>
          <h3>Message from ${user.name}</h3>
          <p>${req.body.message}</p>
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
		from: myEmail,
		to: req.body.email,
		subject: 'Contact request',
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
});

module.exports = router;
