const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const authPhotographer = require("../../middleware/authPhotographer");
const authAdmin = require("../../middleware/authAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
const nodemailer = require("nodemailer");

const User = require("../../models/User");
const Photographer = require("../../models/Photographer");
const Admin = require("../../models/Admin");

// @router  GET api/auth
// @desc    Test route
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @router  POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @router  POST api/auth/forgot
// @desc    User forgot password
// @access  Public
router.post("/forgot", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      const output = `
          <h1>Hie ${user.name},</h1>
          <h2>Password reset</h2>
          <p>Please click the link below to reset your password<p/>
          <a href="http://localhost:3000/auth-user/${token}">reset password</>
        `;

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: myEmail,
          pass: myPassword,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: "Account reset kudziemadzongwe6@gmail.com",
        to: email,
        subject: "Account reset",
        html: output,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.json("Thank you, your email has been sent");
          console.log("Email sent: " + info.response);
        }
      });
      res.json("A password reset link has been sent to your email");
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @router  GET api/auth/photographer
// @desc    Test route
// @access  Private
router.get("/photographer", authPhotographer, async (req, res) => {
  try {
    const user = await Photographer.findById(req.photographer.id).select(
      "-password"
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @router  GET api/auth/photographer/:id
// @desc    Get photographer email
// @access  Private
router.get("/photographer/:id", auth, async (req, res) => {
  try {
    const user = await Photographer.findById(req.params.id).select("-password");
    res.json(user.email);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @router  POST api/auth/photographer
// @desc    Authenticate photographer & get token
// @access  Public
router.post("/photographer", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Photographer.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      photographer: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @router  POST api/auth/photographer/forgot
// @desc    Photographer forgot password
// @access  Public
router.post("/photographer/forgot", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await Photographer.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      photographer: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      const output = `
          <h1>Hie ${user.name},</h1>
          <h2>Password reset</h2>
          <p>Please click the link below to reset your password<p/>
          <a href="http://localhost:3000/auth-photographer/${token}">reset password</>
        `;

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: myEmail,
          pass: myPassword,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: "Account reset kudziemadzongwe6@gmail.com",
        to: email,
        subject: "Account reset",
        html: output,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.json("Thank you, your email has been sent");
          console.log("Email sent: " + info.response);
        }
      });
      res.json("A password reset link has been sent to your email");
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @router  GET api/auth/admin
// @desc    Test route
// @access  Private
router.get("/admin", authAdmin, async (req, res) => {
  try {
    const user = await Admin.findById(req.admin.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @router  POST api/auth/admin
// @desc    Authenticate admin & get token
// @access  Public
router.post("/admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      admin: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @router  POST api/auth/admin/forgot
// @desc    Admin forgot password
// @access  Public
router.post("/admin/forgot", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      admin: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      const output = `
          <h1>Hie ${user.name},</h1>
          <h2>Password reset</h2>
          <p>Please click the link below to reset your password<p/>
          <a href="http://localhost:3000/forgot/${token}">reset password</>
        `;

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: myEmail,
          pass: myPassword,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: "Account reset kudziemadzongwe6@gmail.com",
        to: email,
        subject: "Account reset",
        html: output,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.json("Thank you, your email has been sent");
          console.log("Email sent: " + info.response);
        }
      });
      res.json("A password reset link has been sent to your email");
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
