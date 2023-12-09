import connectDb from "@/middleware/mongoose";
import currentAffairs from "@/models/currentAffairs";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let q = new currentAffairs({
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        solution: req.body.solution,
        correctOption: req.body.correctOption,
      });

      await q.save();

      res.status(200).json({ message: "success" });
    } catch (err) {
      console.error("Error in handler:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "bad request" });
  }
};
export default connectDb(handler);
