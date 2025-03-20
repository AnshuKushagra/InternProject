import mongoose from "mongoose";
const { ObjectId } = mongoose;
const fileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: Number, required: true },
  notes: { type: String, required: true },
  agentId: { type: ObjectId, required: true },
  adminId: { type: ObjectId, required: true },
  agentName: { type: String, required: true },
});
const File = mongoose.model("File", fileSchema);
export default File;
