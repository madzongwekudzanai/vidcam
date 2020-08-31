const express = require("express");
const router = express.Router();
const multer = require("multer");
const authPhotographer = require("../../middleware/authPhotographer");
const authAdmin = require("../../middleware/authAdmin");
const auth = require("../../middleware/auth");

const Photo = require("../../models/Photo");
const Photographer = require("../../models/Photographer");
const PhotoCategory = require("../../models/PhotoCategory");
const Profile = require("../../models/Profile");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/photo/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// @route    Photo api/photos
// @desc     Create a photo
// @access   Private
router.post("/", authPhotographer, async (req, res) => {
  const { title, category, keywords, photoImage } = req.body;
  try {
    const user = await Photographer.findById(req.photographer.id).select(
      "-password"
    );

    const newPhoto = new Photo({
      photoImage,
      title,
      category,
      keywords,
      name: user.name,
      avatar: user.avatar,
      user: req.photographer.id,
    });

    const photo = await newPhoto.save();

    res.json(photo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/photos
// @desc     Get all photos
// @access   Public
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ date: -1 });
    res.json(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/photos/numbered/:sort/:limit
// @desc     Get numbered photos
// @access   Public
router.get("/numbered/:sort/:limit", async (req, res) => {
  try {
    const posts = await Photo.find()
      .sort({ date: parseInt(req.params.sort) })
      .limit(parseInt(req.params.limit));
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/photos/photographer
// @desc     Get all photographer photos
// @access   Private
router.get("/photographer", authPhotographer, async (req, res) => {
  try {
    const photos = await Photo.find({ user: req.photographer.id }).sort({
      date: -1,
    });
    res.json(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/photos/photographer/:id
// @desc     Get photos by photographer id
// @access   Public
router.get("/photographer/:id", async (req, res) => {
  try {
    const photos = await Photo.find({ user: req.params.id }).sort({
      date: -1,
    });
    res.json(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/photos/popular
// @desc     Get popular photos
// @access   Public
router.get("/popular", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ views: -1 }).limit(6);
    res.json(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/photos/categories
// @desc     Get all categories
// @access   Public
router.get("/categories", async (req, res) => {
  try {
    const photos = await PhotoCategory.find().sort({ date: -1 }).limit(6);
    res.json(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/photos/:id
// @desc     Get photo by ID
// @access   Private
router.get("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    const profile = await Profile.findOne({
      user: photo.user,
    });

    // Check for ObjectId format and Photo
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !Photo) {
      return res.status(404).json({ msg: "Photo not found" });
    }

    res.json({ photo, profile });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/photos/:id
// @desc     Delete a Photo
// @access   Private
router.delete("/:id", authPhotographer, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    // Check for ObjectId format and Photo
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !Photo) {
      return res.status(404).json({ msg: "Photo not found" });
    }

    // Check user
    if (photo.user.toString() !== req.photographer.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await photo.remove();

    res.json({ msg: "Photo removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    Get api/photos/likeStatus/:id
// @desc     Get LIKE status
// @access   Private
router.get("/likeStatus/:id", auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    const likeStatus = photo.likes.filter(
      (like) => like.user.toString() === req.user.id
    );

    res.json(likeStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/photos/like/:id
// @desc     Like a Photo
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    // Check if the Photo has already been liked
    if (
      photo.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Photo already liked" });
    }

    photo.likes.unshift({ user: req.user.id });

    await photo.save();
    res.json(photo.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/photos/unlike/:id
// @desc     Unlike a Photo
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    // Check if the Photo has already been disliked
    if (
      photo.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Photo has not yet been disliked" });
    }

    // Get remove index
    const removeIndex = photo.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    photo.likes.splice(removeIndex, 1);

    await photo.save();
    res.json(photo.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    Get api/photos/viewStatus/:id
// @desc     Get view status
// @access   Private
router.get("/viewStatus/:id", auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    const viewStatus = photo.views.filter(
      (view) => view.user.toString() === req.user.id
    );

    res.json(viewStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/photos/view/:id
// @desc     View a Photo
// @access   Private
router.put("/view/:id", auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    // Check if the Photo has already been viewed
    if (
      photo.views.filter((view) => view.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Photo already viewed" });
    }

    photo.views.unshift({ user: req.user.id });

    await photo.save();
    res.json(photo.views);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/photos/search
// @desc     Search photos
// @access   Public
router.post("/search", async (req, res) => {
  try {
    const results = await Photo.aggregate([
      {
        $searchBeta: {
          search: {
            query: req.body.content,
            path: "keywords",
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          photoImage: 1,
          keywords: 1,
          title: 1,
          category: 1,
          name: 1,
          avatar: 1,
          likes: 1,
          views: 1,
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/photos/search/:category
// @desc     Get photos by category
// @access   Public
router.get("/search/:category", async (req, res) => {
  try {
    const results = await Photo.aggregate([
      {
        $searchBeta: {
          search: {
            query: req.params.category,
            path: "category",
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          photoImage: 1,
          title: 1,
          category: 1,
          name: 1,
          avatar: 1,
          likes: 1,
          views: 1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/photos/complete
// @desc     Auto complete
// @access   Public
router.post("/complete", async (req, res) => {
  try {
    const results = await Photo.aggregate([
      {
        $searchBeta: {
          text: {
            path: "keywords",
            query: req.body.content,
            fuzzy: {
              maxEdits: 1,
              maxExpansions: 100,
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          keywords: 1,
        },
      },
      {
        $limit: 8,
      },
    ]);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/photos/category
// @desc     Create a category
// @access   Private
router.post(
  "/category",
  upload.single("photoImage"),
  authAdmin,
  async (req, res) => {
    const { category } = req.body;
    try {
      const newCategory = new PhotoCategory({
        category,
        photoImage: req.file.filename,
      });

      const post = await newCategory.save();
      console.log(req.file);
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
