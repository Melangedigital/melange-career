// import express from "express";
// import { json } from "express";
// import axios from "axios";
// import dotenv from "dotenv";
// import FormData from "form-data";
// import fs from "fs";
// import cors from "cors";
// const app = express();

// dotenv.config();
// const PORT = process.env.PORT || 3000;

// app.use(json());
// app.use(cors());

// app.post("/api/image-url", async (req, res) => {
//   try {
//     const { name, phone, categories } = req.body;
//     // console.log("This is going till here");
//     const jsonString = JSON.stringify(categories);
//     const jsonObject = JSON.parse(jsonString);

//     // Convert the object into plain text
//     const valuesArray = Object.values(jsonObject);
//     let plainText = "";

//     for (let i = 0; i < valuesArray.length; i++) {
//       if (i > 0) {
//         if (i === valuesArray.length - 1) {
//           plainText += " and ";
//         } else {
//           plainText += ", ";
//         }
//       }
//       plainText += valuesArray[i];
//     }
//     const servicesText = valuesArray.length > 1 ? "services" : "service";

//     // Add "service" or "services" to the end of the plain text
//     plainText += ` ${servicesText}`;

//     // console.log(plainText);

//     // jsonString.replace(/[\[\]']+/g, "");

//     var form = new FormData();
//     form.append("file", fs.createReadStream("./Melange_wapp.jpeg"));

//     const { data } = await axios.post(
//       `https://pre-prod.cheerio.in:3443/direct-apis/v1/whatsapp/media-id`,
//       form,
//       {
//         headers: {
//           "x-api-key":
//             "7ba2af64716abcd43b107ef9d2fff8e4e5eeffcc606826a1220b240213922505",
//         },
//       }
//     );
//     const apiKey =
//       "7ba2af64716abcd43b107ef9d2fff8e4e5eeffcc606826a1220b240213922505";

//     const apiUrl =
//       "https://pre-prod.cheerio.in:3443/direct-apis/v1/whatsapp/template/send";

//     const headers = {
//       "x-api-key": apiKey,
//     };

//     let obj = {
//       to: phone,
//       data: {
//         // name: "incoming_lead_website",
//         name: "melange_final_temp",
//         language: {
//           code: "en",
//         },
//         components: [
//           {
//             type: "header",
//             parameters: [
//               {
//                 type: "image",
//                 image: {
//                   id: data.data.id,
//                 },
//               },
//             ],
//           },
//           {
//             type: "body",
//             parameters: [
//               {
//                 type: "text",
//                 text: name,
//               },
//               {
//                 type: "text",
//                 text: plainText,
//               },
//             ],
//           },
//         ],
//       },
//     };

//     const response = await axios.post(apiUrl, obj, { headers });
//     res.status(200).json({
//       data: response.data,

//       message: "Success",
//     });
//   } catch (error) {
//     console.log({ error });
//     res.status(500).json({
//       message: "Internal Server Error",
//       error: error,
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// server.js
// server.js
// server.js
// server.js


import express from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import pkg from "body-parser";
import cors from "cors"; // Import cors

const { urlencoded, json } = pkg;

const app = express();
app.use(cors()); // Use cors
app.use(urlencoded({ extended: true }));
app.use(json());

const upload = multer({ dest: "uploads/" });

app.post("/submit", upload.single("pdf"), (req, res) => {
  const { fullName, email, number, position, cCTC, eCTC, portfolio } = req.body;
  const file = req.file;

  // Ensure recipient email is defined
  const recipientEmail =  "sania@melangedigital.in";
  // Configure the email transport using the default SMTP transport and a GMail account.
  // See https://nodemailer.com/ for more options.
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rahul@melangedigital.in",
      pass: "oisn xtqt xgya pfmo",
    },
  });

  // Setup email data with unicode symbols
  let mailOptions = {
    from: `"Career Form" <${email}> `,
    to: recipientEmail,
    subject: `New Job Application Request from  ${fullName} `,
    text: `Name: ${fullName}\nEmail: ${email}\nContact Number: ${number}\nPosition: ${position}\nCurrent CTC: ${cCTC}\nExpected CTC: ${eCTC}\nPortfolio: ${portfolio}`,
    attachments: [
      {
        filename: file.originalname,
        path: file.path,
      },
    ],
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred. Please try again.");
    } else {
      console.log("Message sent: %s", info.messageId);
      res.send("Form submitted successfully!");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running.......");
});
