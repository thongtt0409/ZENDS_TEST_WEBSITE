const Story = require('../models/Story');

const getAllStory = async (req, res, next) => {
  try {
    const allStory = await Story.find();
    res.json({
      status: 200,
      data: allStory,
    });
  } catch (err) {
    next(err);
  }
};
const insertManyStory = async (req, res, next) => {
  const manyStory = req.body;
  try {
    const newStory = await Story.insertMany(manyStory);
    res.json({
      status: 200,
      data: newStory,
    });
  } catch (err) {
    next(err);
  }
};

const likeStory = async (req, res, next) => {
  try {
    const likeStory = await Story.findByIdAndUpdate(
      req.params.id,
      {
        like: req.sessionID,
      },
      {
        new: true,
      }
    );
    res.json({
      status: 200,
      data: likeStory,
    });
  } catch (err) {
    next(err);
  }
};

const unLikeStory = async (req, res, next) => {
  try {
    const UnlLikeStory = await Story.findByIdAndUpdate(
      req.params.id,
      {
        unlike: req.sessionID,
      },
      {
        new: true,
      }
    );
    res.json({
      status: 200,
      data: UnlLikeStory,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  insertManyStory,
  likeStory,
  unLikeStory,
  getAllStory,
};
