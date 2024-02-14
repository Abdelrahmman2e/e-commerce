const asyncHandler = require("express-async-handler");
const ApiError = require("../util/ApiErrors");
const slugify = require("slugify");

let deleteOne = (Model) =>
  asyncHandler(async (req, res, nxt) => {
    let doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc)
      return nxt(
        new ApiError(
          `The document for this id =>${req.params.id} is Not Found..!!`,
          404
        )
      );
    res.status(204).send();
  });
let updateOne = (Model) =>
  asyncHandler(async (req, res, nxt) => {
    let doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return nxt(
        new ApiError(
          `The Category for this id =>${req.params.id} is Not Found..!!`,
          404
        )
      );
    }
    res.status(200).json({ data: doc });
  });

module.exports = {
  deleteOne,
  updateOne,
};
