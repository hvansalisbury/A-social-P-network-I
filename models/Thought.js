// import mongoose
const { Schema, model, Types } = require('mongoose');
// import dayjs
const dayjs = require('dayjs');
// schema to create reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
       default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: created => dayjs(created).format('MMMM D, YYYY [at] h:mm A'),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: created => dayjs(created).format('MMMM D, YYYY [at] h:mm A'),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);
// returns number of reactions for thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
// thought model created with thoughtSchema
const Thought = model('Thought', thoughtSchema);
// export model
module.exports = Thought;