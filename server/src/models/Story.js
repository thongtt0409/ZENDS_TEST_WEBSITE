const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema(
  {
    content: { type: String, required: true, unique: true, trim: true },
    like: [String],
    unlike: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Story', StorySchema);
