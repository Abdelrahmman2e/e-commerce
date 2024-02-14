const asyncHandler = require("express-async-handler");
const ApiError = require("../util/ApiErrors");
const slugify = require("slugify");
const ApiFeatures = require("../util/ApiFeatures");

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
          `The document for this id =>${req.params.id} is Not Found..!!`,
          404
        )
      );
    }
    res.status(200).json({ data: doc });
  });

let createOne = (Model) =>
  asyncHandler(async (req, res, nxt) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return nxt(new ApiError("Some Field Are Missed..!!", 400));
    }
    res.status(201).json({ data: doc });
  });

let getById = (Model) =>
  asyncHandler(async (req, res, nxt) => {
    const { id } = req.params;

    const doc = await Model.findById(id);
    if (!doc) {
      return nxt(new ApiError(`No document for this Id: ${id}`, 404));
    }
    res.status(200).json({ data: doc });
  });

let getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    const docsCount = await Model.countDocuments();
    const ApiFeature = new ApiFeatures(Model.find(req.filterObj), req.query)
      .paginate(docsCount)
      .sort()
      .search(modelName)
      .fieldsLimit()
      .filter();

    const { mongooseQuery, ResultPagination } = ApiFeature;
    const docs = await mongooseQuery;

    res.json({
      results: docs.length,
      ResultPagination,
      data: docs,
    });
  });
module.exports = {
  deleteOne,
  updateOne,
  createOne,
  getAll,
  getById,
};
