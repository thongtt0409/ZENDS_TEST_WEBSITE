const router = require('express').Router();
const storyController = require('../controllers/story.controller');

router.get('/all', storyController.getAllStory);
router.post('/insert-many', storyController.insertManyStory);
router.put('/like/:id', storyController.likeStory);
router.put('/unlike/:id', storyController.unLikeStory);

module.exports = router;
