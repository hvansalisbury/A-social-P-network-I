// import express router
const router = require('express').Router();
// import user controller functions
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
