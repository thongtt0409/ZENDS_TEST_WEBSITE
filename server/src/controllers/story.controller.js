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
    const checkLikeStory = await Story.findById(req.params.id);
    if (!checkLikeStory.like.includes(req.sessionID)) {
      const likeStory = await Story.findByIdAndUpdate(
        req.params.id,
        {
          $push: { like: req.sessionID },
        },
        {
          new: true,
        }
      );
      res.json({
        status: 200,
        data: likeStory,
      });
    } else {
      res.json({
        status: 400,
        message: 'You did vote this joke!!!!',
      });
    }
  } catch (err) {
    next(err);
  }
};

const unLikeStory = async (req, res, next) => {
  try {
    const checkUnLikeStory = await Story.findById(req.params.id);
    if (!checkUnLikeStory.unlike.includes(req.sessionID)) {
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
    } else {
      res.json({
        status: 400,
        message: 'You did vote this joke!!!!',
      });
    }
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
