import mongoose from "mongoose";

const AuditSchema = mongoose.Schema({
  title: String,
  date: Date,
  selectedFiles: Object,
  author: String
});

export default mongoose.model("Audit", AuditSchema);