// import express router
const router = require('express').Router();
// import thought controller functions
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/user/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').post(addReaction).delete(removeReaction);

module.exports = router;
