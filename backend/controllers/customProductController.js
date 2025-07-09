const Customproduct = require("../models/customProductModel");
const { Resend } = require("resend"); // Import resend configuration

const resend = new Resend(process.env.RESEND_API_KEY);

const customProductPost = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.files", req.files);

  const logoFile = req.files?.logo?.[0];
  const customPdfFile = req.files?.customPdf?.[0];

  if (!logoFile || !customPdfFile) {
    return res.status(400).json({ error: "Missing file(s)" });
  }

  const logoBuffer = logoFile.buffer;
  const uploadedPdfBuffer = customPdfFile.buffer; // Keep original
  console.log("logoBuffer", logoBuffer);
  console.log("uploadedPdfBuffer", uploadedPdfBuffer);

  try {
    // Parse the text field safely
    let parsedText;
    try {
      parsedText =
        typeof req.body.text === "string"
          ? JSON.parse(req.body.text)
          : req.body.text;
    } catch (e) {
      return res.status(400).json({ error: "Invalid text format" });
    }

    // try {
    // 1. Save into database
    // const customData = new Customproduct({
    //   ...req.body,
    //   quantity: parseInt(req.body.quantity),
    //   text: parsedText,
    //   logo: {
    //     data: logoBuffer,
    //     contentType: logoFile.mimetype,
    //   },
    // });

    const customFields = {
      quantity: parseInt(req.body.quantity),
      text: parsedText,
      logo: {
        data: logoBuffer,
        contentType: logoFile.mimetype,
      },
      phone: req.body.phone, // Required field
    };

    // Optional fields - only assign if present
    const optionalFields = [
      "fabricType",
      "base",
      "crown",
      "sandwich",
      "peak",
      "topbutton",
      "printType",
      "crownColor",
      "sandwichColor",
      "topbuttonColor",
      "peakColor",
      "logo",
      "text",
    ];

    optionalFields.forEach((field) => {
      if (req.body[field]) {
        customFields[field] = req.body[field];
      }
    });

    // Save to DB
    const customData = new Customproduct(customFields);
    try {
      await customData.save();

      // await customData.save();
      console.log("✅ Document saved:", customData);
    } catch (saveErr) {
      console.error("❌ Error while saving:", saveErr);
    }
    // 2. After successful save, prepare email
    const {
      fabricType,
      crown,
      sandwich,
      peak,
      printType,
      // text,
      // font,
      // textColor,
      crownColor,
      sandwichColor,
      topbuttonColor,
      peakColor,
      // companyName,
      // location,
      phone,
    } = req.body;
    console.log("crown", crown);
    console.log("sandwich", sandwich);
    console.log("peak", peak);
    // const parsedText = JSON.parse(req.body.text);

    const htmlMessage = `
      <p>Hi Team,</p>
      <p>You have received a new custom product inquiry through <a href="https://printkee.com" target="_blank">Printkee.com</a>. Below are the product details:</p>
      
      <P>Phone number: ${phone}</p>
      <p>Product Id: ${customData.productId}</p>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
        <thead style="background-color: #f2f2f2;">
          <tr>
            <th>Fabric Type</th>
            <th>Logo</th>
            <th>Face</th>
            <th>Print Type</th>
            <th>Selected Color</th>
            <th>Text</th>
            <th>Font Style</th>
            <th>Text Color</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="4">${fabricType || "-"}</td>
            <td rowspan="4">
              <img src="cid:logoImage" width="100" height="100" />
            </td>
            <td>crown</td>
            <td rowspan="4">${printType || "-"}</td>
            <td><div style="background-color: ${
              crownColor || "#ffffff"
            }; width: 30px; height: 30px; border-radius: 50%; margin: auto;"></div></td>
            <td rowspan="4">${parsedText[0]?.content || "-"}</td>
            <td rowspan="4">${parsedText[0]?.font || "-"}</td>
            <td rowspan="4"><div style="background-color: ${
              parsedText[0]?.color || "#ffffff"
            }; width: 30px; height: 30px; border-radius: 50%; margin: auto;"></div></td>
          </tr>
          <tr>
            <td>sandwich</td>
            <td><div style="background-color: ${
              sandwichColor || "#ffffff"
            }; width: 30px; height: 30px; border-radius: 50%; margin: auto;"></div></td>
          </tr>
          <tr>
            <td>topbutton</td>
            <td><div style="background-color: ${
              topbuttonColor || "#ffffff"
            }; width: 30px; height: 30px; border-radius: 50%; margin: auto;"></div></td>
          </tr>
          <tr>
            <td>peak</td>
            <td><div style="background-color: ${
              peakColor || "#ffffff"
            }; width: 30px; height: 30px; border-radius: 50%; margin: auto;"></div></td>
          </tr>
        </tbody>
      </table>
      <p>Please reach out to the user as soon as possible.</p>
      <p>Best regards,<br/>Printkee</p>
    `;

    console.log("File object:", req.files);

    const generatedPdfBuffer = uploadedPdfBuffer; // just reuse it as-is

    // 3. Send the email
    const emailResponse = await resend.emails.send({
      from: "no-reply@coachingpromo.in",
      to: "sales@mfglobalservices.com", // Your team email
      // to: "alizapk90@gmail.com",
      subject: "New Custom Product Inquiry",
      html: htmlMessage,
      attachments: [
        {
          filename: "logo.png",
          content: Buffer.from(logoBuffer).toString("base64"),
          contentType: logoFile.mimetype,
          cid: "logoImage",
          disposition: "inline",
        },
        {
          filename: "custom-cap.pdf",
          content: Buffer.from(generatedPdfBuffer).toString("base64"),
          contentType: "application/pdf",
          disposition: "attachment",
        },
      ],
    });
    console.log("Email response from Resend:", emailResponse);

    // 4. Send success response
    res.json({ success: true, message: "custom product saved and email sent" });
  } catch (error) {
    console.error("Submit or email error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const customProductPostTshirt = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.files", req.files);

  const frontLogoFile = req.files?.frontLogo?.[0];
  const backLogoFile = req.files?.backLogo?.[0];
  const sleevesLogoFile = req.files?.sleevesLogo?.[0];

  const customPdfFile = req.files?.customPdf?.[0];

  if (!customPdfFile || (!frontLogoFile && !backLogoFile && !sleevesLogoFile)) {
    return res.status(400).json({ error: "Missing logo(s) or PDF file" });
  }

  // Choose first available logo for preview/email attachment
  const logoToUse = frontLogoFile || backLogoFile || sleevesLogoFile;
  const logoBuffer = logoToUse?.buffer;
  const uploadedPdfBuffer = customPdfFile?.buffer;

  console.log("logoBuffer", logoBuffer);
  console.log("uploadedPdfBuffer", uploadedPdfBuffer);

  try {
    // Parse the text field safely
    let frontText = [];
    let backText = [];
    let sleevesText = [];

    try {
      frontText = JSON.parse(req.body.frontText || "[]");
      backText = JSON.parse(req.body.backText || "[]");
      sleevesText = JSON.parse(req.body.sleevesText || "[]");
    } catch (e) {
      return res.status(400).json({ error: "Invalid text format" });
    }
    const customFields = {
      quantity: parseInt(req.body.totalQuantity),
      phone: req.body.phone,
      fabricType: req.body.fabricType,
      printType: req.body.printType,
      front: {
        logo: frontLogoFile
          ? {
              data: frontLogoFile.buffer,
              contentType: frontLogoFile.mimetype,
            }
          : undefined,
        text: frontText,
      },
      back: {
        logo: backLogoFile
          ? {
              data: backLogoFile.buffer,
              contentType: backLogoFile.mimetype,
            }
          : undefined,
        text: backText,
      },
      sleeves: {
        logo: sleevesLogoFile
          ? {
              data: sleevesLogoFile.buffer,
              contentType: sleevesLogoFile.mimetype,
            }
          : undefined,
        text: sleevesText,
      },
    };

    // Optional fields - only assign if present
    const optionalFields = [
      "fabricType",
      "base",
      "crown",
      "sandwich",
      "peak",
      "topbutton",
      "printType",
      "crownColor",
      "sandwichColor",
      "topbuttonColor",
      "peakColor",
      "logo",
      "text",
    ];

    optionalFields.forEach((field) => {
      if (req.body[field]) {
        customFields[field] = req.body[field];
      }
    });

    // Save to DB
    const customData = new Customproduct(customFields);
    try {
      await customData.save();

      // await customData.save();
      console.log("✅ Document saved:", customData);
    } catch (saveErr) {
      console.error("❌ Error while saving:", saveErr);
    }
    // 2. After successful save, prepare email
    const { fabricType, printType, phone } = req.body;
    // const parsedText = JSON.parse(req.body.text);

    const htmlMessage = `
      <p>Hi Team,</p>
      <p>You have received a new custom product inquiry through <a href="https://printkee.com" target="_blank">Printkee.com</a>. Below are the product details:</p>
      
      <P>Phone number: ${phone}</p>
      <p>Product Id: ${customData.productId}</p>
     <p><strong>Front Text:</strong> ${frontText
       .map((t) => t.content)
       .join(", ")}</p>
<p><strong>Back Text:</strong> ${backText.map((t) => t.content).join(", ")}</p>
<p><strong>Sleeves Text:</strong> ${sleevesText
      .map((t) => t.content)
      .join(", ")}</p>

      <p>Please reach out to the user as soon as possible.</p>
      <p>Best regards,<br/>Printkee</p>
    `;

    console.log("File object:", req.files);

    // const generatedPdfBuffer = uploadedPdfBuffer; // just reuse it as-is

    const logoAttachments = [];

    if (frontLogoFile) {
      logoAttachments.push({
        filename: "front-logo.png",
        content: Buffer.from(frontLogoFile.buffer).toString("base64"),
        contentType: frontLogoFile.mimetype,
        disposition: "attachment",
      });
    }

    if (backLogoFile) {
      logoAttachments.push({
        filename: "back-logo.png",
        content: Buffer.from(backLogoFile.buffer).toString("base64"),
        contentType: backLogoFile.mimetype,
        disposition: "attachment",
      });
    }

    if (sleevesLogoFile) {
      logoAttachments.push({
        filename: "sleeves-logo.png",
        content: Buffer.from(sleevesLogoFile.buffer).toString("base64"),
        contentType: sleevesLogoFile.mimetype,
        disposition: "attachment",
      });
    }

    // 3. Send the email
    //     const logoToUse = frontLogoFile || backLogoFile || sleevesLogoFile;
    // const logoBuffer = logoToUse?.buffer
    const emailResponse = await resend.emails.send({
      from: "no-reply@coachingpromo.in",
      to: "sales@mfglobalservices.com", // Your team email
      // to: "alizapk90@gmail.com",
      subject: "New Custom Product Inquiry",
      html: htmlMessage,
      attachments: [
        ...logoAttachments,
        {
          filename: "custom-cap.pdf",
          content: Buffer.from(uploadedPdfBuffer).toString("base64"),
          contentType: "application/pdf",
          disposition: "attachment",
        },
      ],
    });
    console.log("Email response from Resend:", emailResponse);

    // 4. Send success response
    res.json({ success: true, message: "custom product saved and email sent" });
  } catch (error) {
    console.error("Submit or email error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { customProductPostTshirt, customProductPost };
