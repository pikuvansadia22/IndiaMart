const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const contact = require('../models/contact')

var session;


exports.getcontactUsInfo = async function (req, res) {
  session=req.session;
    const conatctInfo=await contact.findOne({  email: "group5lambton@gmail.com"  })
    if(conatctInfo!=null)
    {
        res.render('contact',{title_page:"contact",contact_us:conatctInfo,success:"",user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
    }
    else
    {
        res.send();
    }
   
}

exports.sendEmail = async function (req, res) {
      const conatctInfo=await contact.findOne({  email: "group5lambton@gmail.com"  })

  try {
    const oauth2Client = new OAuth2(
      "253902382626-tdtrr3qrcvc3arsob770p602fu9m23jm.apps.googleusercontent.com",
      "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",
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: "1//04Tw1iIsfT6IqCgYIARAAGAQSNwF-L9IrztKgollBarHFwXUNiHC-aeBacdaiv1cnpkcNjQwYstDcdJ_FLPMNnEuA0h22CLi15Ms",
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("*ERR: ", err)
          reject();
        }
        resolve(token); 
      });
    });

    const mailOptions = {
      from: req.body.email,
      to: "group5lambton@gmail.com" ,
      subject: "new inquiry from user" ,
      text: "Name of person: " +req.body.name+"\n Message: "+req.body.message
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "group5lambton@gmail.com",
        accessToken,
        clientId: "253902382626-tdtrr3qrcvc3arsob770p602fu9m23jm.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04Tw1iIsfT6IqCgYIARAAGAQSNwF-L9IrztKgollBarHFwXUNiHC-aeBacdaiv1cnpkcNjQwYstDcdJ_FLPMNnEuA0h22CLi15Ms",
      },
    });
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
          console.log(err)
      } else {
         res.render('contact',{title_page:"contact",contact_us:conatctInfo,success:"Your message has been sent successfully",user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
      }
  });
  } catch (err) {
    console.log(err)
  }
};

