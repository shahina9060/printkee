const { Resend } = require("resend");
const Email = require("../models/emailModel");
const Productemail = require("../models/productEmailModel");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (req, res) => {
  const { name, company, email, phone, requirements } = req.body;

  try {
    // HTML email message with formatting
    const htmlMessage = `
      <p>Hi Team,</p>
      <p>
        You have received a new inquiry through 
        <a href="https://printkee.com" target="_blank">Printkee.com</a>. 
        Please find the details below:
      </p>

      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Company Name:</strong> ${company}</li>
        <li><strong>Message:</strong> ${requirements}</li>
      </ul>

      <p>Please reach out to the user as soon as possible.</p>

      <p>Best regards,<br/>
      Printkee</p>
    `;
    const response = await resend.emails.send({
      from: "no-reply@coachingpromo.in", // Must be a verified domain email
      to: "sales@mfglobalservices.com",
      // to: "alizapk90@gmail.com",
      subject: "New Message from Contact Form",
      html: htmlMessage,
      text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${requirements}`,
    });

    // Store email details in MongoDB
    const emailRecord = new Email({
      name,
      company,
      email,
      phone,
      requirements,
    });
    await emailRecord.save();
    console.log("email formate response:", response);
    res.json({ success: true, message: "Email sent successfully!", response });
  } catch (error) {
    console.error("Email sending error:", error);
    res
      .status(500)
      .json({ success: false, message: "Email failed to send", error });
  }
};

const sendProductEmail = async (req, res) => {
  // const {
  //   fabricType,
  //   logo,
  //   crown,
  //   crownColor,
  //   sandwich,
  //   sandwichColor,
  //   topbutton,
  //   topbuttonColor,
  //   peak,
  //   peakColor,
  //   printType,
  //   text,
  //   font,
  // } = req.body;
console.log("logo",req.body)
// logo: {
//   data: req.file.buffer,
//   contentType: req.file.mimetype,
// },
logo = {
  data: req.file.buffer,
}
  try {
    // HTML email message with formatting
//     const htmlMessage = `
//   <p>Hi Team,</p>
//   <p>
//     You have received a new custom product inquiry through 
//     <a href="https://printkee.com" target="_blank">Printkee.com</a>. 
//     Please find the product details below:
//   </p>

//   <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
//     <thead style="background-color: #f2f2f2;">
//       <tr>
//         <th>Fabric Type</th>
//         <th>Logo</th>
//         <th>Face</th>
//         <th>Print Type</th>
//         <th>Selected Color</th>
//         <th>Given Text</th>
//         <th>Font Style</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td rowspan="4">${fabricType}</td>
//         <td rowspan="4">
//           ${
//             logo
//               ? `<img src="${logo}" width="100" height="100" style="border: none;" />`
//               : ""
//           }
//         </td>
//         <td>${crown}</td>
//         <td>${printType}</td>
//         <td style="background-color: ${crownColor
//         }; width: 30px; height: 30px;"></td>
//         <td rowspan="4">${text}</td>
//         <td rowspan="4">${font}</td>
//       </tr>
//       <tr>
//         <td>${sandwich}</td>
//         <td>${printType}</td>
//         <td style="background-color: ${sandwichColor
//         }; width: 30px; height: 30px;"></td>
//       </tr>
//       <tr>
//         <td>${topbutton}</td>
//         <td>${printType}</td>
//         <td style="background-color: ${
//           topbuttonColor
//         }; width: 30px; height: 30px;"></td>
//       </tr>
//       <tr>
//         <td>${peak}</td>
//         <td>${printType}</td>
//         <td style="background-color: ${
//           peakColor
//         }; width: 30px; height: 30px;"></td>
//       </tr>
//     </tbody>
//   </table>

//   <p>Please reach out to the user as soon as possible.</p>

//   <p>Best regards,<br/>
//   Printkee</p>
// `;

const htmlMessage = `
  <p>Hi Team,</p>
  <p>
    You have received a new custom product inquiry through 
    <a href="https://printkee.com" target="_blank">Printkee.com</a>. 
    Please find the product details below:
  </p>

  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
    <thead style="background-color: #f2f2f2;">
      <tr>
        <th>Fabric Type</th>
        <th>Logo</th>
        <th>Face</th>
        <th>Print Type</th>
        <th>Selected Color</th>
        <th>Given Text</th>
        <th>Font Style</th>
        <th>Text Color</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="4">${fabricType}</td>
        <td rowspan="4">
          ${
            logo
              ? `<img src="${logo}" width="100" height="100" style="border: none;" />`
              : ""
          }
        </td>
        <td>${crown}</td>
        <td rowspan="4">${printType}</td>
        <td>
          <div style="background-color: ${crownColor}; width: 30px; height: 30px; border-radius: 50%; margin: auto;"></div>
        </td>
        <td rowspan="4">${textContent}</td>
        <td rowspan="4">${font}</td>
        <td rowspan="4">
          <div style="background-color: ${textColor}; width: 30px; height: 30px; border-radius: 50%; margin: auto;"></div>
        </td>
      </tr>
      <tr>
        <td>${sandwich}</td>
        <td>
          <div style="background-color: ${sandwichColor}; width: 30px; height: 30px; border-radius: 50%; margin: auto;"></div>
        </td>
      </tr>
      <tr>
        <td>${topbutton}</td>
        <td>
          <div style="background-color: ${topbuttonColor}; width: 30px; height: 30px; border-radius: 50%; margin: auto;"></div>
        </td>
      </tr>
      <tr>
        <td>${peak}</td>
        <td>
          <div style="background-color: ${peakColor}; width: 30px; height: 30px; border-radius: 50%; margin: auto;"></div>
        </td>
      </tr>
    </tbody>
  </table>

  <p>Please reach out to the user as soon as possible.</p>

  <p>Best regards,<br/>
  Printkee</p>
`;


    const response = await resend.emails.send({
      from: "no-reply@coachingpromo.in", // Must be a verified domain email
      // to: "sales@mfglobalservices.com",
      to: "alizapk90@gmail.com",
      subject: "New Message from Contact Form",
      html: htmlMessage,
      // text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${requirements}`,
    });

    // Store email details in MongoDB
    const emailRecord = new Productemail({
      // fabricType,
      // logo,
      // crown,
      // crownColor,
      // sandwich,
      // sandwichColor,
      // topbutton,
      // topbuttonColor,
      // peak,
      // peakColor,
      // printType,
      // text,
      // font,
      ...req.body,
      quantity: parseInt(req.body.quantity),
      text: JSON.parse(req.body.text),
      logo: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await emailRecord.save();
    console.log("email formate response:", response);
    res.json({ success: true, message: "product details submitted & Emailed successfully!", response });
  } catch (error) {
    console.error("Email sending error:", error);
    res
      .status(500)
      .json({ success: false, message: "Email failed to send", error });
  }
};

module.exports = { sendEmail, sendProductEmail };
