const Comment = require('../models/comments');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const httpStatus = require('../constants/generalConstants');

exports.createComment = async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    responseSuccess(res, httpStatus.CREATED, 'create comment', 'create comment success', comment);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'create comment', 'create comment failed');
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const comment = await Comment.findOneAndUpdate(_id, { $set: { ...req.body } });
    responseSuccess(res, httpStatus.NO_CONTENT, 'update comment', 'update comment success', comment);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'update comment', 'update comment failed');
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const comment = await Comment.findOneAndDelete(_id);
    responseSuccess(res, httpStatus.NO_CONTENT, 'delete comment', 'delete comment success', comment);
  } catch (error) {
    responseError(res, httpStatus.BAD_REQUEST, 'delete comment', 'delete comment failed');
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.aggregate([
      {
        $lookup: {
          from: 'User',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner_details',
        },
      },
    ]);
    responseSuccess(res, httpStatus.OK, 'fetch comments', 'fetch comments success', comments);
  } catch (error) {
    responseError(req, httpStatus.BAD_REQUEST, 'fetch comments', 'fetch comments failed');
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const comments = await Comment.findByIdAndUpdate(_id);
    responseSuccess(res, httpStatus.OK, 'fetch comments', 'fetch comments success', comments);
  } catch (error) {
    responseError(req, httpStatus.BAD_REQUEST, 'fetch comments', 'fetch comments failed');
  }
};
