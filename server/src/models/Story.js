const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema(
  {
    content: { type: String, required: true, unique: true, trim: true },
    like: { type: Number, default: 0 },
    unlike: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Story', StorySchema);
