import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";
import answer from "@/models/answer";

const handler = async (req, res) => {
  let answers = await answer.find();
  res.status(200).json({ answers });
};

export default connectDb(handler);
