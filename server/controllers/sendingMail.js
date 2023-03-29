const nodemailer = require('nodemailer');
const User = require("../models/user.model");
const EmployerModel = require('../models/employer.model')

const sendMail = async(req,res) =>{
  
  const userEmail = await User.find({_id:req.query.user})
  const employerJobData = await EmployerModel.findOne({_id:req.query.employer})

  var transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth:{
        user:'techperfectelearning@gmail.com',  // Mail of naukriwise 
        pass:'selckvyndywkkdxq'                 // Specific pasword is generated for this purpose
    }
  })


  // send mail with defined transport object
  let mailOptions = {
    from: '"From naukriwise" <techperfectelearning@gmail.com>',
    subject: 'Test email',
};

  //                   Comapny mail                    Student mail
  let recipients = [employerJobData.postedBy.email,userEmail[0].email];

  await recipients.forEach(function(to,index) {
    // check if the recipient is Company then send that someone has applied for thier job post
    if (index === 0) {
        mailOptions.to = to;
        mailOptions.text = 'Someone has applied for your job post';
    } else {
        mailOptions.to = to;
        mailOptions.html = `<h5>Hello ${userEmail[0].name} </h5>
        <p>This mail is to inform you that you have applied for Job as ${employerJobData.job_title} at ${employerJobData.company} on naukriwise</p>`
    }

    // sending the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ status: 'error', msg: 'Something went wrong' });
        } else {
            console.log('Email sent to '+to+' : ' + info.response);
            res.json({ status: 'ok', msg: 'Mail has been sent' });
        }
    });
});
  
 
}

module.exports = {sendMail}






