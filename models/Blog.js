const mongoose = require("mongoose");

const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    require: true,
  },
  coverImage: {
    type: String,
    require: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: String,
    default: new Date(),
  },
  update: {
    type: String,
    default: new Date(),
  },
});

module.exports = Blog = mongoose.model("blog", BlogSchema);
