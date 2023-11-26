import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  //   const existingQuestion = await question.findOne({ slug: req.body.slug });

  //   if (existingQuestion) {
  //     return res
  //       .status(400)
  //       .json({ message: "A question with this slug already exists." });
  //   }
  if (req.method == "POST") {
    let q = new topper({
      name: req.body.name,
      rank: req.body.rank,
      year: req.body.year,
      gs1marks: req.body.gs1marks,
      gs2marks: req.body.gs2marks,
      gs3marks: req.body.gs3marks,
      gs4marks: req.body.gs4marks,
      essayMarks: req.body.essayMarks,
      prelimsScoreGs: req.body.prelimsScoreGs,
      prelimsScoreCsat: req.body.prelimsScoreCsat,
      optionalSub: req.body.optionalSub,
      optional1Marks: req.body.optional1Marks,
      optional2Marks: req.body.optional2Marks,
      Remarks: req.body.Remarks,
    });

    await q.save();
    res.status(200).json({ message: "success" });
  } else {
    res.status(400).json({ message: "bad request" });
  }
};
export default connectDb(handler);
