const express = require('express');

const router = express.Router();

// controllers
const {
	signup,
	signin,
	forgotPassword,
	resetPassword,
	requireSignIn,
	uploadImage,
	updatePassword,
	userProfile,
} = require('../controllers/auth');

router.get('/', (req, res) => {
	return res.json({
		data: 'hello world from kaloraat auth API',
	});
});
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post("/update-password",requireSignIn, updatePassword);
router.post("/upload-image", requireSignIn, uploadImage)
router.get('/user-profile/:userId', userProfile);

module.exports = router;
