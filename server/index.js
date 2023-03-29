const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const { loginController } = require("./controllers/loginController");
const multer = require("multer");
const { uploadController } = require("./controllers/uploadController");
const { companyDetailUploader } = require("./controllers/companyDetailUploader");
const bodyParser = require("body-parser");

// Models---->
const Company = require('./models/company.model')
const User = require("./models/user.model");
const EmployerJobDb = require('./models/employer.model')
const Feedback = require('./models/feedback.model')


const funcs = require('./functions')
const cron = require('node-cron');

const HOUR_OF_DAY = '10' // Hour of the day when the CRON Jobs are run in 24 hour format

// Routers -->
const jobsRouter = require('./Routes/job-Route');
const mailRouter = require('./Routes/sendMail-API')
const userRouter = require('./Routes/user-Route')
const adminRouter = require('./Routes/admin-Route')
const employerRouter = require('./Routes/employerRoute');
const { feedbackDetailUploader } = require("./controllers/feedbackImageUploader");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "./public/data"));
app.use(bodyParser.urlencoded(
  { extended: true }
))


// Routes ----->
app.use('/api', jobsRouter)
app.use('/api', mailRouter)
app.use('/api/user', userRouter)
app.use('/admin', adminRouter)
app.use('/employer', employerRouter)
app.use('/admin/permission', require('./Routes/admin-rolePermissionsRoute.js'))


// Login Api -->
app.post("/api/login", loginController);

// VIMEO API ---Profile video upload on vimeo api -->
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/data/uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.filename}`)
  }
})
const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), uploadController);


// POST api for uploading company details and logo ----> By ADMIN
const companyStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/data/companyImages/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`)
  }
})
const companyStorageUpload = multer({ storage: companyStorage })
app.post('/admin/companyDetail', companyStorageUpload.single('imagefile'), companyDetailUploader)

// GET company name and logo on dashboard
app.get('/admin/companyDetail', async (req, res) => {
  try {
    const companyDetail = await Company.find()
    res.json({ companyDetail });
  } catch (e) {
    res.json({ status: 'error', msg: 'something went wrong' })
  }
})

const feedbackStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/data/feedBackImages/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`)
  }
})
const feedbackStorageUpload = multer({ storage: feedbackStorage })
app.post('/admin/feedbackDetail', feedbackStorageUpload.single('imagefile'), feedbackDetailUploader)

app.get('/admin/feedbackDetail', async (req, res) => {
  try {
    const feedbackDetail = await Feedback.find()
    res.json({ feedbackDetail });
  } catch (e) {
    res.json({ status: 'error', msg: 'something went wrong' })
  }
})


// GET user detail --->
app.get('/user/:id', async (req, res) => {
  const id = req.params.id
  const userDetail = await User.find({ _id: id })
  res.json({ status: "ok", data: userDetail })
})



app.listen(9002, () => {
  console.log("Server is running on http://localhost:9002/")

  // cron.schedule(`* * ${HOUR_OF_DAY} * * *`, funcs.callJobs);
});
