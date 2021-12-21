const express = require('express');
const router = express.Router();
const {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getComments,
} = require('../controllers/commentController');

router.route('/api/comment').get(getComments).post(createComment);

router.route('/api/comment/:id').get(getComment).patch(updateComment).delete(deleteComment);

module.exports = router;
