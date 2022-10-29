const Token = require("../models/tokenModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Inventory = require("../models/inventoryModel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

const generateVerificationToken = async (user) => {
  try {
    console.log(user);
    const verifyToken = await Token.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    const url = `http://localhost:3000/users/${user._id}/verify/${verifyToken.token}`;
    const htmlPayload = `<h2>Pizza acc verification</h2>
      <p><b>Click link : </b>${url}</p>
    `;
    const toAddress = user.email;
    const emailSubject = "pizza site acc verification";

    sendEmail(toAddress, htmlPayload, emailSubject);
  } catch (err) {
    console.log("Error while sending email");
  }
};

const sendEmail = async (toAddress, htmlPayload, emailSubject) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    service: "hotmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.USER,
    to: toAddress,
    subject: emailSubject,
    html: htmlPayload,
  });

  console.log(`Email sent successfully to ${toAddress}`);
};

const updateInventory = async (base, sauce, cheese) => {
  try {
    await Inventory.updateOne(
      { "base._id": base },
      { $inc: { "base.$.quantity": -1 } }
    );

    await Inventory.updateOne(
      { "sauce._id": sauce },
      { $inc: { "sauce.$.quantity": -1 } }
    );

    await Inventory.updateOne(
      { "cheese._id": cheese },
      { $inc: { "cheese.$.quantity": -1 } }
    );
  } catch (error) {
    console.log(error);
  }
};

const checkInventory = async () => {
  try {
    const inventory = (await Inventory.find({}))[0];
    let emailBody = ``;

    for (let prop in inventory) {
      if (prop === "base" || prop === "sauce" || prop === "cheese") {
        inventory[prop].forEach((x) => {
          if (x.quantity < 20)
            emailBody += `${prop} | ${x.type} | ${x.quantity}<br>`;
        });
      }
    }

    // console.log(res);

    if (emailBody) {
      const toAddress = "lalitrn44@gmail.com";
      const htmlPayload = `<h3>Below inventories needs to be replenished</h3><br><p>${emailBody}</p>`;
      const emailSubject = "Alert : low inventories!!!";

      sendEmail(toAddress, htmlPayload, emailSubject);
    }
  } catch (error) {}
};

const genereateToken = (user) => {
  // console.log(user);
  return jwt.sign(
    {
      _id: user._id,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET_KEY
  );
};

const verifyAndDecodeToken = (token) => {
  // console.log(token);
  return jwt.verify(token, JWT_SECRET_KEY);
};

module.exports = {
  generateVerificationToken,
  sendEmail,
  updateInventory,
  checkInventory,
  genereateToken,
  verifyAndDecodeToken,
};
