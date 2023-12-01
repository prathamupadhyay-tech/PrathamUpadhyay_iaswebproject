import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      // Create a new topper instance with text data
      let newTopper = new topper({
        name: req.body.name,
        rank: req.body.rank,
        year: req.body.year,
        gs1marks: req.body.gs1marks,
        gs2marks: req.body.gs2marks,
        gs3marks: req.body.gs3marks,
        gs4marks: req.body.gs4marks,
        ProfileImage: req.body.profileImage,
        essayMarks: req.body.essayMarks,
        prelimsScoreGs: req.body.prelimsScoreGs,
        prelimsScoreCsat: req.body.prelimsScoreCsat,
        optionalSub: req.body.optionalSub,
        optional1Marks: req.body.optional1Marks,
        optional2Marks: req.body.optional2Marks,
        Remarks: req.body.Remarks,
      });

      // Save the topper data to the database
      const savedTopper = await newTopper.save();
      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ message: "bad request" });
    }
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default connectDb(handler);
