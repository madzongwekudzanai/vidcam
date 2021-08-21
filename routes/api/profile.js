const express = require('express');
const router = express.Router();
const authPhotographer = require('../../middleware/authPhotographer');
const auth = require('../../middleware/auth');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const parseUri = require('parse-data-uri');
const mimeTypes = require('mime-types');
const Profile = require('../../models/Profile');
const Photographer = require('../../models/Photographer');
const Photo = require('../../models/Photo');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', authPhotographer, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.photographer.id,
		});
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', authPhotographer, async (req, res) => {
	const { website, location, bio, twitter, instagram, facebook, profileImage } =
		req.body;
	try {
		const user = await Photographer.findById(req.photographer.id).select(
			'-password',
		);

		const ajdImage = profileImage.split('&#x2F;').join('/');
		var parsed = parseUri(ajdImage);
		const ext = mimeTypes.extension(parsed.mimeType);
		const data = parsed.data;
		const buffer = Buffer.from(data, 'base64');
		const prof = await Profile.findOne({
			user: req.photographer.id,
		});
		if (prof) {
			return fs.unlink(
				path.join(__dirname, `../../client/public${prof.profileImage}`),
				(err) => {
					if (err) res.status(400).json('Cannot update photo');
					console.log(`Photo Deleted`);
				},
			);
		}

		crypto.randomBytes(16, (err, buf) => {
			if (err) {
				return reject(err);
			}
			const filename = buf.toString('hex');
			fs.writeFile(
				path.join(__dirname, `../../client/public/profile/${filename}.${ext}`),
				buffer,
				async (err) => {
					if (err) res.status(400).json('Image not upload');
					// Build profile object
					const profileFields = {};
					profileFields.user = req.photographer.id;
					profileFields.avatar = user.avatar;
					profileFields.name = user.name;
					if (website) profileFields.website = website;
					if (location) profileFields.location = location;
					if (bio) profileFields.bio = bio;
					if (profileImage)
						profileFields.profileImage = `/profile/${filename}.${ext}`;

					// Build social object
					profileFields.social = {};
					if (twitter) profileFields.social.twitter = twitter;
					if (facebook) profileFields.social.facebook = facebook;
					if (instagram) profileFields.social.instagram = instagram;

					let profile = await Profile.findOneAndUpdate(
						{ user: req.photographer.id },
						{ $set: profileFields },
						{ new: true, upsert: true },
					);
					res.json(profile);
				},
			);
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find();
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/profile/popular
// @desc     Get popular profiles
// @access   Public
router.get('/popular', async (req, res) => {
	try {
		const profiles = await Profile.find().sort({ followers: -1 }).limit(5);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		});

		if (!profile) return res.status(400).json({ msg: 'Profile not found' });

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', authPhotographer, async (req, res) => {
	try {
		const photos = await Photo.find({ user: req.photographer.id });
		photos.forEach((phot) => {
			fs.unlink(
				path.join(__dirname, `../../client/public${phot.photoImage}`),
				(err) => {
					if (err) res.status(400).json('Photo Not Deleted');
					console.log(`Photo Deleted`);
				},
			);
		});
		const prof = await Profile.findOne({
			user: req.photographer.id,
		});
		fs.unlink(
			path.join(__dirname, `../../client/public${prof.profileImage}`),
			(err) => {
				if (err) res.status(400).json('Photo Not Deleted');
				console.log(`Photo Deleted`);
			},
		);
		await Photo.deleteMany({ user: req.photographer.id });
		// Remove profile

		await Profile.findOneAndRemove({ user: req.photographer.id });
		// Remove user
		await Photographer.findOneAndRemove({ _id: req.photographer.id });

		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    Get api/profile/followStatus/:id
// @desc     Get following status
// @access   Private
router.get('/followStatus/:id', auth, async (req, res) => {
	try {
		const photoGrapher = await Profile.findById(req.params.id);
		const follStat = photoGrapher.followers.filter(
			(follower) => follower.user.toString() === req.user.id,
		);
		res.json(follStat);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/profile/follow/:id
// @desc     Follow Photographer
// @access   Private
router.put('/follow/:id', auth, async (req, res) => {
	try {
		const photoGrapher = await Profile.findById(req.params.id);

		// Check if the Photographer has already been followed
		if (
			photoGrapher.followers.filter(
				(follower) => follower.user.toString() === req.user.id,
			).length > 0
		) {
			return res
				.status(400)
				.json({ msg: 'You already follow this photographer' });
		}

		photoGrapher.followers.unshift({ user: req.user.id });

		await photoGrapher.save();

		res.json(photoGrapher.followers);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/profile/unFollow/:id
// @desc     Unfollow Photographer
// @access   Private
router.put('/unFollow/:id', auth, async (req, res) => {
	try {
		const photoGrapher = await Profile.findById(req.params.id);

		// Check if the Photographer has already been unfollowed
		if (
			photoGrapher.followers.filter(
				(follower) => follower.user.toString() === req.user.id,
			).length === 0
		) {
			return res
				.status(400)
				.json({ msg: "You don't follow this photographer" });
		}

		// Get remove index
		const removeIndex = photoGrapher.followers
			.map((follower) => follower.user.toString())
			.indexOf(req.user.id);

		photoGrapher.followers.splice(removeIndex, 1);

		await photoGrapher.save();

		res.json(photoGrapher.followers);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/profile/search
// @desc     Search photographer
// @access   Public
router.post('/search', async (req, res) => {
	try {
		const results = await Profile.aggregate([
			{
				$searchBeta: {
					search: {
						query: req.body.content,
						path: 'name',
					},
				},
			},
			{
				$project: {
					_id: 1,
					user: 1,
					name: 1,
					avatar: 1,
					bio: 1,
				},
			},
		]);

		res.json(results);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/profile/complete
// @desc     Auto complete
// @access   Public
router.post('/complete', async (req, res) => {
	try {
		const results = await Profile.aggregate([
			{
				$searchBeta: {
					text: {
						path: 'name',
						query: req.body.content,
						fuzzy: {
							maxEdits: 1,
							maxExpansions: 100,
						},
					},
				},
			},
			{
				$limit: 8,
			},
			{
				$project: {
					name: 1,
				},
			},
		]);

		res.json(results);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
