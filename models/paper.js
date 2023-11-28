import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
mongoose.models = {};
export default mongoose.model("Paper", paperSchema);
