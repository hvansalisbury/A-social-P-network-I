// import mongoose objectIds
const { ObjectId } = require('mongoose').Types;
// import user and thought models
const { User, Thought } = require('../models');

// Aggregate function to get the number of students overall
const headCount = async () =>
  Student.aggregate()
    .count('studentCount')
    .then((numberOfStudents) => numberOfStudents);

// Aggregate function for getting the overall grade using $avg
const grade = async (studentId) =>
  Student.aggregate([
    // only include the given student by using $match
    { $match: { _id: ObjectId(studentId) } },
    {
      $unwind: '$assignments',
    },
    {
      $group: {
        _id: ObjectId(studentId),
        overallGrade: { $avg: '$assignments.score' },
      },
    },
  ]);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => res.json(users))
      .catch((err) =>
        res.status(500).json(err)
      );
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'User not found' })
          : res.json(user)
      )
      .catch((err) =>
        res.status(500).json(err)
      )
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err))
  },

  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'User not found' })
          : Thought.deleteMany({ username: user.username })
      )
      .then(() => res.json({
        message: 'User & thoughts deleted'
      }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a friend
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
