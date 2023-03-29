const Employer = require('./models/employer.model')
const nodemailer = require('nodemailer')

const findDup = async (email, phone) => {
    const dupEmail = await Employer.findOne({
        email: email,
    })

    const dupPhone = await Employer.findOne({
        number: phone,
    })

    const duplicates = {
        email: false,
        phone: false,
        verified: false,
    }

    if (dupEmail) {
        duplicates.email = true
        duplicates.verified = dupEmail.verified
    }
    if (dupPhone) {
        duplicates.phone = true
        duplicates.verified = dupEmail.verified
    }

    return duplicates
}

// const sendOTP = (email, OTP) => {
//     let mailTransporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: "kshitij.test.apps@gmail.com",
//             pass: "zozzwterpweyxprv",
//         }
//     })

//     let details = {
//         from: "kshitij.test.apps@gmail.com",
//         to: email,
//         subject: "OTP for verification",
//         text: OTP,
//     }

//     mailTransporter.sendMail(details, (err) => {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             console.log('Mail Sent!')
//         }
//     })
// }
const sendOTP = (email, OTP, subject = "OTP for verification") => {
    let mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "techperfectelearning@gmail.com", // Mail of naukriwise
        pass: "selckvyndywkkdxq", // Specific pasword is generated for this purpose
      },
    });
  
    let details = {
      from: '"From Naukriwise" <techperfectelearning@gmail.com>',
      to: email,
      subject: subject,
      text: OTP,
    };
  
    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log("Error Sending Mail");
      } else {
        console.log("Mail Sent!");
      }
    });
  };
  

const clearDatabase = async () => {
    await Employer.deleteMany({ verified: false })
}

const callJobs = () => {
    try {
        clearDatabase()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    findDup,
    sendOTP,
    callJobs,
}