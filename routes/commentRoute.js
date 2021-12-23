const express = require('express');
const router = express.Router();
const {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getComments,
} = require('../controllers/commentController');

// const { isAdmin, isOwner, isBuyer } = require('../controllers/authController');
const { isAuthorized } = require('../controllers/authController');

router.route('/api/comment').get(isAuthorized, getComments).post(isAuthorized, createComment);

router
  .route('/api/comment/:id')
  .get(isAuthorized, getComment)
  .patch(isAuthorized, updateComment)
  .delete(isAuthorized, deleteComment);

module.exports = router;
