const mongoose = require("mongoose");

const EmployerJobDB = mongoose.createConnection(
  "mongodb+srv://skmaurya:skmaurya@cluster0.hqmrxhw.mongodb.net/?retryWrites=true&w=majority"
);

const employerJobSchema = new mongoose.Schema({
  postedBy: {
    name: { type: String },
    email: { type: String },
    // required: true
  },
  job_title: {
    type: String,
    // required: true
  },
  company: {
    type: String,
    // required: true
  },
  adminVerified: {
    type: Boolean,
  },

  // full time / part time / contract based
  employment_type: {
    type: String,
    // required: true,
  },

  // work from home
  wfh: {
    type: Boolean,
    // required: true,
  },
  job_desc: {
    type: String,
    // required: true,
  },
  skills: {
    type: Array,
  },
  work_exp: {
    minExp: { type: String },
    maxExp: { type: String },
  },
  salaryRange: {
    minSal: { type: String },
    maxSal: { type: String },
  },
  location: {
    type: String,
  },
  industry: {
    type: String,
  },
  functionalArea: {
    type: String,
  },
  role: {
    type: String,
  },

  // number of vacancies
  vacancies: {
    type: String,
  },
  education: {
    graduation: { type: String },
    diploma: { type: String },
  },
  questions: {
    q1: { type: String },
    q2: { type: String },
    q3: { type: String },
  },
  other: {
    type: String,
  },
  walkIn: {
    type: Boolean,
  },
  walkIn_details: {
    start_date: { type: Date },
    duration: { type: String },
    contact_person: { type: String },
    contact_number: { type: String },
    venue: { type: String },
    google_maps_url: { type: String },
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  applied: [
    {
      studentId: { type: String },
      appliedAt: { type: Date, default: Date.now },
      _id: false,
    },
  ],
  rejectedStudentId: [
    {
      studentId: { type: String },
      appliedAt: { type: Date, default: Date.now },
      _id: false,
    },
  ],
  approvedStudentId: [
    {
      studentId: { type: String },
      appliedAt: { type: Date, default: Date.now },
      _id: false,
    },
  ],

  recommendatStudent:[
    {
      studentId: { type: String },
      appliedAt: { type: Date, default: Date.now },
      _id: false,
    },
  ],
  // -----Changes by Shivangi singh --->
  work_exp: {
    minExp: { type: Number },
    maxExp: { type: Number },
  },
  salaryRange: {
    minSal: { type: Number },
    maxSal: { type: Number },
  },

  mode: {
    type: String,
    enum: {
      values: ["Work from office", "Work from home", "Hybrid", "Temp WFH"],
      message: "{VALUE} is not supported",
    },
    default: "Work from office",
  },
  testrole: {
    type: String,
  },
  companyType: {
    type: String,
    enum: {
      values: ["startup", "indian MNC", "foreign MNC", "corporate"],
      message: "{VALUE} is not supported",
    },
    default: "corporate",
  },
  testEducation: {
    type: String,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  //Changes end--->
});

const model = EmployerJobDB.model("EmployerjobProfile", employerJobSchema);
module.exports = model;
