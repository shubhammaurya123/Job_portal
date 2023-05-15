// Changes on merging ---> change path of employer model
const EmployerModel = require("../models/employer.model");
const StudentDB = require("../models/user.model")
//  Return job according to user search
const getSearchedJob = async (req, res) => {
  const workMode = ["Work from office", "Work from home", "Hybrid", "Temp WFH"];
  const companyType = ["startup", "indian MNC", "foreign MNC", "corporate"];
  let salaryQuery = {};
  const queryObject = {};
  let expQuery = {};
  console.log(req.query);
  //  Searching JOB
  if (req.query.q === "search") {
    try {
      const { designation, location, experience, salary } = req.query;
      //  Search on the basis of job_title --->
      if (designation) {
        queryObject.job_title = { $in: designation.split(",") };
      }
      //  Search on the basis of location --->
      if (location) {
        queryObject.location = { $in: location.split(",") };
      }
      //  Search on the basis of experience --->
      if (experience) {
        const minmax = experience.split("-");
        const minexp = Number(minmax[0]);
        const maxexp = Number(minmax[1]);
        expQuery = {
          $and: [
            { "work_exp.minExp": { $gte: minexp } },
            { "work_exp.maxExp": { $lte: maxexp } },
          ],
        };
      }
      //  Search on the basis of salary --->
      if (salary) {
        let numbers = salary
          .split(",")
          .map((numStr) => numStr.split("-").map(Number));
        let min = Math.min(...numbers.flat().filter((num) => !isNaN(num)));
        let max = Math.max(...numbers.flat().filter((num) => !isNaN(num)));
        salaryQuery = {
          $and: [
            { "salaryRange.minSal": { $gte: min } },
            { "salaryRange.maxSal": { $lte: max } },
          ],
        };
      }
      const jobData = await EmployerModel.find({
        $and: [queryObject, salaryQuery, expQuery],
      });
      res.json({ jobData });
    } catch (e) {
      res.json({ status: "error", message: "Something went wrong" });
    }
  } else {
    const { salary, type, wmode, e, location, role, exp } = req.query;
    // JOB filter by role ---->
    if (role) {
      queryObject.testrole = { $in: req.query.role.split(",") };
    }
    //  JOB filter by work mode ---->
    if (wmode && wmode !== "-1") {
      let finalArray = [];
      wmode.split(",").forEach((i) => {
        finalArray.push(workMode[parseInt(i)]);
      });
      console.log(finalArray);
      queryObject.mode = { $in: finalArray };
    }
    //  JOB filter by company Type ---->
    if (type && type !== "-1") {
      let finalArray = [];
      type.split(",").forEach((i) => {
        finalArray.push(companyType[parseInt(i)]);
      });
      queryObject.companyType = { $in: finalArray };
    }
    // Job filter by salary
    if (salary) {
      let max = Number(salary);
      salaryQuery = {
        $and: [
          { "salaryRange.minSal": { $gte: 0 } },
          { "salaryRange.maxSal": { $lte: max } },
        ],
      };
    }
    // Job filter by Experience
    if (exp) {
      const minexp = 0;
      const maxexp = Number(exp);
      expQuery = {
        $and: [
          { "work_exp.minExp": { $gte: minexp } },
          { "work_exp.maxExp": { $lte: maxexp } },
        ],
      };
    }
    // JOB filter by location --------->
    if (location) {
      queryObject.location = { $in: req.query.location.split(",") };
    }
    // JOB filter by Education --->
    if (e) {
      const array = e.split(",");
      const finalArray = array.flatMap((element) => element.split("/"));
      console.log(finalArray);
      queryObject.testEducation = { $in: finalArray };
      // queryObject.education = { "graduation": { "$in": finalArray }}
    }

    const jobData = await EmployerModel.find({
      $and: [queryObject, salaryQuery, expQuery],
    }).sort({ "salaryRange.maxSal": -1, "work_exp.maxExp": -1 });
    res.json({ jobData });
  }
};

// Return the job detail of single job
const getSingleJob = async (req, res) => {
  const jobId = req.params._id;
  const jobRole = req.params.title;
  try {
    const JobDetail = await EmployerModel.findOne({ _id: jobId });
    const skillList = JobDetail.skills;
    const similarJob = await EmployerModel.find({
      skills: { $all: skillList },
      _id: { $ne: jobId },
    });
    res.json({ status: "ok", data: JobDetail, similarJob: similarJob });
  } catch (e) {
    res.json({ status: "error", errorMsg: "Something went wrong" });
  }
};

const updateStudentApplied = async (req, res) => {
  try {
    const id = req.params.id;
    const jobId = req.params.jobId;
    const query = { _id: jobId };
    const update = { $push: { applied: { studentId: id } } };
    const studentApplied = await EmployerModel.updateOne(query, update);


    //now we  find if Student Skills matches more the 70% then Student Show in recommendation
    const student = await StudentDB.findById(id);
    const studentSkill = student.skills
    const employer = await EmployerModel.findById(jobId);
     const employerSkill = employer.skills
     const matches = studentSkill.filter(value => employerSkill.includes(value));
     const numMatches = matches.length;

     const percentage = (numMatches*100)/employerSkill.length;
      console.log(percentage);
     if(percentage >= 70) {
      const update = { $push: {  recommendatStudent: { studentId: id } } };
      const studentApplied = await EmployerModel.updateOne(query, update);
     }
     res.json({ status: "ok", msg: true });
  } catch (e) {
    res.json({ status: "error", msg: "Something went wrong" });
  }
};
const updateStudentApproved = async (req, res) => {
  try {
    const id = req.params.id;
    const jobId = req.params.jobId;
    const query = { _id: jobId };
    const update = { $push: {  approvedStudentId:{ studentId: id }} };
    const studentApplied = await EmployerModel.updateOne(query, update);
    res.json({ status: "ok", msg: true });
  } catch (e) {
    res.json({ status: "error", msg: "Something went wrong" });
  }
};
const updateStudentRejected = async (req, res) => {
  try {
    const id = req.params.id;
    const jobId = req.params.jobId;
    const query = { _id: jobId };
    const update = { $push: {  rejectedStudentId:{ studentId: id } } };
    const studentRejected= await EmployerModel.updateOne(query, update);
    res.json({ status: "ok", msg: true });
  } catch (e) {
    res.json({ status: "error", msg: "Something went wrong" });
  }
};
module.exports = {
  getSearchedJob,
  getSingleJob,
  updateStudentApplied,
  updateStudentApproved,
  updateStudentRejected

};
