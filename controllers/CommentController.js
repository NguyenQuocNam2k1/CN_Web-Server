const { commentModel } = require("../models/CommentModel");

exports.getComment = async (req, res) => {
  try {
    commentModel.find()
      .then((data) => {
        return res.status(200).json({
          status: "200",
          data,
        });
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({
          status: "500",
          message: "SERVER ERROR",
        });
      });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "500",
      message: "SERVER ERROR",
    });
  }
};

