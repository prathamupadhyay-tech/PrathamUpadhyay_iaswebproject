import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  let toppers = await topper.find();
  res.status(200).json({ toppers });
};

export default connectDb(handler);
