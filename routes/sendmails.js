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
    "<tr><td><strong>Website:</strong> </td><td>" +
    req.body.website +
    "</td></tr>";
  html +=
    "<tr><td><strong>Company Name:</strong> </td><td>" +
    req.body.companyname +
    "</td></tr>";
  html +=
    "<tr><td><strong>Phone Number:</strong> </td><td>" +
    req.body.phone_number +
    "</td></tr>";
  html +=
    "<tr><td><strong>Country:</strong> </td><td>" +
    req.body.country +
    "</td></tr>";
  html +=
    "<tr><td><strong>State:</strong> </td><td>" + req.body.state + "</td></tr>";
  html +=
    "<tr><td><strong>Describe your project and talent needs:</strong> </td><td>" +
    req.body.description +
    "</td></tr>";
  html +=
    "<tr><td><strong>Date(s) and location of production:</strong> </td><td>" +
    req.body.production +
    "</td></tr>";
  html +=
    "<tr><td><strong>How did you hear about us?:</strong> </td><td>" +
    req.body.hearing +
    "</td></tr>";
  html +=
    "<tr><td><strong>If you have worked with us before, which office:</strong> </td><td>" +
    req.body.office +
    "</td></tr>";
  html +=
    "<tr><td><strong>Looing for?:</strong> </td><td>" +
    req.body.looking +
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
    if (err) {
      console.log(err);
      res.json({
        success: "false"
      });
    } else {
      console.log(info);
      res.json({
        success: "true"
      });
    }
  });
};

exports.contactUS = (req, res) => {
  console.log("Contact US");
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
    if (err) {
      console.log(err);
      res.json({
        success: "false"
      });
    } else {
      console.log(info);
      res.json({
        success: "true"
      });
    }
  });
};
