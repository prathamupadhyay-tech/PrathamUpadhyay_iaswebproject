import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";

import paper from "@/models/paper";

const handler = async (req, res) => {
  let papers = await paper.find();
  res.status(200).json({ papers });
};

export default connectDb(handler);
