import question from "@/models/question";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  let questions = await question.find();
  res.status(200).json({ questions });
};

export default connectDb(handler);
