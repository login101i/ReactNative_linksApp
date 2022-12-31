const express = require("express");

const router = express.Router();

// controllers
const {
	postLink,
	links,
	viewCount,
	like,
	unlike,
	removeLink,
	linksCount
} = require("../controllers/link");
const { requireSignIn } = require("../controllers/auth");

router.post("/post-link", requireSignIn, postLink);
router.get("/links/:page", links);
router.put("/view-count/:linkId", viewCount);
router.put("/like", requireSignIn, like)
router.put("/unlike", requireSignIn, unlike)
// router.get("/read", requireSignIn);
// router.put("/update", requireSignIn, update);
router.delete("/removelink/:linkId", requireSignIn, removeLink);
router.get("/links-count", linksCount)

module.exports = router;
