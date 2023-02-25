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
        $inc: { like: +1 },
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
  const UnlLikeStory = await Story.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { unlike: +1 },
    },
    {
      new: true,
    }
  );
  res.json({
    status: 200,
    data: UnlLikeStory,
  });
};

module.exports = {
  insertManyStory,
  likeStory,
  unLikeStory,
  getAllStory,
};
