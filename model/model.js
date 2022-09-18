const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseDocumentLog = require("mongoose-document-log");

const todoSchema = new mongoose.Schema(
  {
    task: String,
    done: Boolean,
  },
  { timestamps: true }
);

// mongooseHistory
todoSchema.plugin(mongooseDocumentLog);

// pagination
todoSchema.plugin(mongoosePaginate);

// soft deletes
todoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("t_todos", todoSchema);