import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

import formidable, { errors as formidableErrors } from "formidable";

// export const config = {
//   api: {
//     bodyParser: [
//       api
//     ],
//   },
// };

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

const saveTopper = async (req, res) => {
  try {
    // if (!files) {
    //   return res.status(400).json({ message: "Image file is required" });
    // }

    const startIndex = req.body.profileImage.indexOf(",") + 1;
    const base64ImageData = req.body.profileImage.slice(startIndex);
    const buffer = Buffer.from(base64ImageData, "base64");

    const compressedBuffer = await sharp(buffer)
      .resize({ width: 250, height: 250 })
      .withMetadata()
      .jpeg({ quality: 80 }) // Adjust quality as needed
      .toBuffer();

    // const filename = new Date().getTime() + "-" + req.file.originalname;
    // const newFilePath = path.join(UPLOAD_PATH, filename);

    // const buffer = await sharp(req.file.buffer)
    //   .resize()
    //   .jpeg({ quality: 50 })
    //   .toBuffer();
  
    const image64 = compressedBuffer.toString("base64");

    let newTopper = new topper({
      name: req.body.name,
      rank: req.body.rank,
      year: req.body.year,
      gs1marks: req.body.gs1marks,
      gs2marks: req.body.gs2marks,
      gs3marks: req.body.gs3marks,
      gs4marks: req.body.gs4marks,
      ProfileImage: image64,
      essayMarks: req.body.essayMarks,
      prelimsScoreGs: req.body.prelimsScoreGs,
      prelimsScoreCsat: req.body.prelimsScoreCsat,
      optionalSub: req.body.optionalSub,

      optional1Marks: req.body.optional1Marks,
      optional2Marks: req.body.optional2Marks,
      Remarks: req.body.Remarks,
    });
    const savedTopper = await newTopper.save();
    
    return res.status(200).json({ message: "successful" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Issue" });
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

// const post = async (req, res) => {
//   const form = formidable({});
//   let fields;
//   let files;
//   try {
//     [fields, files] = await form.parse(req);
//     console.log(fields);
//     console.log(files);
//     await saveTopper(fields, files);
//     res.status(200).json({ message: "saved" });
//   } catch (err) {
//     // example to check for a very specific error
//     if (err.code === formidableErrors.maxFieldsExceeded) {
//     }
//     console.log(err);
//     console.error(err);
//     res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
//     res.end(String(err));
//     return;
//   }
//   // try {
//   //   const form = new formidable.IncomingForm();

//   //   form.parse(req, async function (err, fields, files) {
//   //     await saveTopper(files.file);
//   //     return res.status(201).json({ message: "saved" });
//   //   });
//   // } catch (err) {
//   //   console.log(err);
//   //   res.status(500).json({ message: err });
//   // }
// };

export default saveTopper;
