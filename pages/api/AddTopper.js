import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { createRouter, expressWrapper } from "next-connect";
const UPLOAD_PATH = path.join("public", "uploads");
const router = createRouter();

export const config = {
  api: {
    bodyParser: false,
    
  },
};
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  }),
});

router
  .use(upload.single("profileImage"))

  .post(async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
      }
      console.log("req file", req.file);
      console.log("body");
      const filename = new Date().getTime() + "-" + req.file.originalname;
      const newFilePath = path.join(UPLOAD_PATH, filename);

      console.log("filename" + newFilePath);

      let newTopper = new topper({
        name: req.body.name,
        rank: req.body.rank,
        year: req.body.year,
        gs1marks: req.body.gs1marks,
        gs2marks: req.body.gs2marks,
        gs3marks: req.body.gs3marks,
        gs4marks: req.body.gs4marks,
        ProfileImage: filename,
        essayMarks: req.body.essayMarks,
        prelimsScoreGs: req.body.prelimsScoreGs,
        prelimsScoreCsat: req.body.prelimsScoreCsat,
        optionalSub: req.body.optionalSub,

        optional1Marks: req.body.optional1Marks,
        optional2Marks: req.body.optional2Marks,
        Remarks: req.body.Remarks,
      });
      const savedTopper = await newTopper.save();
      await sharp(req.file.path)
        .resize()
        .jpeg({ quality: 50 })
        .toFile(newFilePath);

      if (fs.existsSync(req.file.path)) {
        // Attempt to unlink the file
        try {
          fs.unlinkSync(req.file.path);
          console.log("File deleted successfully.");
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      } else {
        console.warn("File does not exist:", req.file.path);
      }

      res.status(200).json({ message: "success", savedTopper });
    } catch {
      res.status(500).json({ message: "internal server issue" });
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
