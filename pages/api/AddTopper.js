import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { createRouter, expressWrapper } from "next-connect";
import formidable, { errors as formidableErrors } from "formidable";
const UPLOAD_PATH = path.join("public", "uploads");
const router = createRouter();

export const config = {
  api: {
    bodyParser: false,
  },
};

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, UPLOAD_PATH);
//     },
//     filename: function (req, file, cb) {
//       cb(null, new Date().getTime() + "-" + file.originalname);
//     },
//   }),
// });

router
  // .use(upload.single("profileImage"))

  .post(async (req, res) => {
    const form = formidable({});
    let fields;
    let files;
    try {
      [fields, files] = await form.parse(req);
      console.log(fields);
      console.log(files);
      await saveTopper(fields, files);
      res.status(200).json({ message: "saved" });
    } catch (err) {
      // example to check for a very specific error
      if (err.code === formidableErrors.maxFieldsExceeded) {
      }
      console.log(err);
      console.error(err);
      res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
      res.end(String(err));
      return;
    }
    // try {
    //   const form = new formidable.IncomingForm();

    //   form.parse(req, async function (err, fields, files) {
    //     await saveTopper(files.file);
    //     return res.status(201).json({ message: "saved" });
    //   });
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).json({ message: err });
    // }
  });

const saveTopper = async (fields, files) => {
  try {
    if (!files) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // const compressedBuffer = await sharp(files.profileImage[0].filepath)
    //   .resize({ width: 250, height: 250 })
    //   .withMetadata()
    //   .jpeg({ quality: 80 }) // Adjust quality as needed
    //   .toBuffer();

    // const filename = new Date().getTime() + "-" + req.file.originalname;
    // const newFilePath = path.join(UPLOAD_PATH, filename);

    // const buffer = await sharp(req.file.buffer)
    //   .resize()
    //   .jpeg({ quality: 50 })
    //   .toBuffer();

    // const image64 = compressedBuffer.toString("base64");

    let newTopper = new topper({
      name: fields.name[0],
      rank: parseInt(fields.rank[0]),
      year: parseInt(fields.year[0]),
      gs1marks: parseInt(fields.gs1marks[0]),
      gs2marks: parseInt(fields.gs2marks[0]),
      gs3marks: parseInt(fields.gs3marks[0]),
      gs4marks: parseInt(fields.gs4marks[0]),

      essayMarks: parseInt(fields.essayMarks[0]),
      prelimsScoreGs: parseInt(fields.prelimsScoreGs[0]),
      prelimsScoreCsat: parseInt(fields.prelimsScoreCsat[0]),
      optionalSub: fields.optionalSub[0],

      optional1Marks: parseInt(fields.optional1Marks[0]),
      optional2Marks: parseInt(fields.optional2Marks[0]),
      Remarks: fields.Remarks[0],
    });
    const savedTopper = await newTopper.save();
    console.log("topper" + savedTopper);
  } catch (err) {
    console.log(err);
  }
  // await sharp(req.file.path)
  //   .resize()
  //   .jpeg({ quality: 50 })
  //   .toFile(newFilePath);

  // if (fs.existsSync(req.file.path)) {
  //   // Attempt to unlink the file
  //   try {
  //     fs.unlinkSync(req.file.path);
  //     console.log("File deleted successfully.");
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //   }
  // } else {
  //   console.warn("File does not exist:", req.file.path);
  // }
};

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
