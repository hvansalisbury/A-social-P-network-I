// import mongoose
const { Schema, model } = require('mongoose');
// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      min_length: 4,
      max_length: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^.+@(?:[\w-]+\.)+\w+$/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// returns number of friends for user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});
// user model created with userSchema
const User = model('user', userSchema);
// exports model
module.exports = User;