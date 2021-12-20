const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    property: { type: Schema.Types.ObjectId, ref: 'Property' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Comments = mongoose.Model('Comments', commentsSchema);

module.exports = Comments;
