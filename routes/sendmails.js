//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "talent.dev.guru@gmail.com",
    pass: "qwertyuiop813@"
  }
});

exports.findTalent = (req, res) => {
  console.log("findTalent");

  var html = "<html><body>";
  html += '<table rules="all" style="border-color: #666;" cellpadding="10">';
  html +=
    "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" +
    req.body.name +
    "</td></tr>";
  html +=
    "<tr><td><strong>Email:</strong> </td><td>" + req.body.email + "</td></tr>";
  html +=
    "<tr><td><strong>Phone Number:</strong> </td><td>" +
    req.body.phone_number +
    "</td></tr>";
  html +=
    "<tr><td><strong>Message:</strong> </td><td>" +
    req.body.message +
    "</td></tr>";
  html += "</table>";
  html += "</body></html>";

  const mailOptions = {
    from: "suzuki.kuro813@gmail.com", // sender address
    to: "aziro.suzuki813@gmail.com", // list of receivers
    subject: "Contact Info", // Subject line
    html: html // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

exports.contactUS = (req, res) => {};
