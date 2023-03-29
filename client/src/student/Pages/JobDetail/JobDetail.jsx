import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import JobCard from "../../Component/JobCard/JobCard";
import { BiShoppingBag, BiRupee, BiLocationPlus } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import { BsBookmark, BsShare, BsFillBookmarkFill } from "react-icons/bs";
import {
  AiTwotoneLike,
  AiTwotoneDislike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import "./JobDetail.css";
import useAuth from "../../controllers/auth";

const JobDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const curLocation = location.pathname
  const { _id, title } = useParams();
  const [tokenData, isTokenExpired, isLogin] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [jobDetail, setJobDetail] = useState();
  const [similarJob, setSimilarJob] = useState();

  const [isApplied, setIsApplied] = useState(false);
  const [isBookmarked, setISBookmarked] = useState(false);
  const [iconMessage, setIconMessage] = useState();
  const [liked, setLiked] = useState({ isLiked: false, likeNo: 0 });
  const [disliked, setDisliked] = useState({ isDisliked: false, dislikeNo: 0 });

 
  const [bubble ,setBubbleMsg] = useState({
    showBubble:false,
    bubbleMsg:''
  })

  useEffect(() => {
    getJobDetail();
  }, [_id, title]);

  useEffect(() => {
    userJobdetail();
  }, [tokenData, isApplied, isBookmarked ]);

  // Fetching job detail which was clicked by user
  const getJobDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:9002/api/job/${title}/${_id}`
      );
      const data = await response.json();
      if (data.status === "ok") {
        setJobDetail(data.data);
        setLiked({ ...liked, likeNo: data.data.like });
        setDisliked({ ...disliked, dislikeNo: data.data.dislike });
        setSimilarJob(data.similarJob);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  // Function for calling Details API about user applied job ,liked or disliked job , bookmarked job
  const userJobdetail = async () => {
    if (localStorage.getItem("token")) {
      try {
        const response = await fetch(`http://localhost:9002/api/user/${_id}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 200) {
          setIsApplied(data.data.jobIsApplied);
          setISBookmarked(data.data.jobIsBookmarked);
          setLiked({ ...liked, isLiked: data.data.jobIsLiked });
          setDisliked({ ...disliked, isDisliked: data.data.jobIsDisLiked });
        } else {
          console.log("Error");
        }
      } catch (e) {
        setError(true);
      }
    }
  };

  // Function for calling Applying Job  API
  const jobApplyhandler = async () => {
    if (isLogin) {
      console.log("apply");
      try {
        // API for sending job applied email to user
        const response = await fetch(
          `http://localhost:9002/api/mail?user=${tokenData.id}&employer=${_id}`
        );
        // Api for updating applied job id into user database
        const res2 = await fetch(
          `http://localhost:9002/api/user/${tokenData.id}/${_id}`,
          {
            method: "PATCH",
          }
        );
        // Api for updating student applied id into job database
        const res3 = await fetch(
          `http://localhost:9002/api/job/${tokenData.id}/${_id}`,
          {
            method: "PATCH",
          }
        );
        const msg = await response.json();
        const msg2 = await res2.json();
        const msg3 = await res3.json();
        setIsApplied(true);
        console.log(msg, msg2, msg3);
      } catch (e) {
        setError(true);
      }
    } else {
      navigate("/student/login", { state: {from:curLocation}});
    }
  };

  // Function for calling Bookmark Job  API
  const bookmarkHandler = async () => {
    if(isLogin){
    if (!isBookmarked ) {
      const response = await fetch(
        `http://localhost:9002/api/user/bookmark/${tokenData.id}/${_id}`,
        {
          method: "PATCH",
        }
      );
      const msg = await response.json();
      console.log(msg);
      setIconMessage(msg.message);
      setISBookmarked(true);
    } else {
      const response = await fetch(
        `http://localhost:9002/api/user/bookmark/${tokenData.id}/${_id}`,
        {
          method: "DELETE",
        }
      );
      const deletemsg = await response.json();
      console.log(deletemsg);
      setIconMessage(deletemsg.message);
      setISBookmarked(false);
    }
  }else{
    navigate("/student/login", { state: {from:curLocation}});
  }
  };

  const likeHandler = async() => {
   if(isLogin){
      try {
        const response = await fetch(`http://localhost:9002/api/user/action/like/${_id}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
          method:"PATCH",
        });
        const data = await response.json();
        console.log(data);
        if(data.status===200){
          setLiked({
            ...liked,isLiked:true
          })
          setDisliked({
            ...disliked,isDisliked:false
          })
          setJobDetail({
            ...jobDetail,like:jobDetail.like+1
          })
        }
      } catch (e) {
        setError(true)
      }
    }else{
      navigate("/student/login", { state: {from:curLocation}});
    }
  };

  const disLikeHandler = async() => {
  if(isLogin){
      try {
        const response = await fetch(`http://localhost:9002/api/user/action/dislike/${_id}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
          method:"PATCH",
        });
        const data = await response.json();
        console.log(data);
        if(data.status===200){
          setDisliked({
            ...disliked, isDisliked:true
          })
          setLiked({
            ...liked,isLiked:false
          })
          setJobDetail({
            ...jobDetail,dislike:jobDetail.dislike+1
          })
        }
      } catch (e) {
        setError(true)
      }
    }else{
      navigate("/student/login", { state: {from:curLocation}});
    }
  };


  const handleLikeDislikeTrue = (msg)=>{
    setBubbleMsg({
      showBubble:true,
      bubbleMsg:msg
    })
  }
  const handleLikeDislikeOut = ()=>{
    setBubbleMsg({
      showBubble:false,
      bubbleMsg:''
    })
  }


  useEffect(() => {
    if (document.getElementById("disabled") != null) {
      if (isApplied) {
        document.getElementById("disabled").disabled = true;
        document.getElementById("disabled").innerText = "Applied";
        document.getElementById("disabled").style.cursor = "not-allowed";
      }
    }
  }, [isApplied, setIsApplied]);

  if (loading) {
    return <h2>Loading...</h2>;
  } else if (error) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <button
          onClick={() => {
            window.location.reload();
            setError(false);
          }}
        >
          Reload
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <section className="job-detail-cn">
          <div>
            <span style={{ color: "blue", fontSize: ".85em" }}>
              {iconMessage}
            </span>
            <div className="job-detail-btn-icon">
              <i className="save-icon jd-icon" onClick={bookmarkHandler}>
                {isBookmarked ? <BsFillBookmarkFill /> : <BsBookmark />}
              </i>
              <i className="share-icon jd-icon">
                <BsShare />
              </i>
              <div className={`${bubble.showBubble?"speech-bubble rounded showBubble":"speech-bubble rounded"} `}>
               {bubble.bubbleMsg}
              </div>
              <i className="like-icon jd-icon" >
                {liked.isLiked ? <AiTwotoneLike onMouseOver={(e)=>handleLikeDislikeTrue('Can Like once')} onMouseOut={handleLikeDislikeOut} /> : <AiOutlineLike onClick={likeHandler} />}
                <span>{jobDetail.like}</span>
              </i>

              <i className="dislike-icon jd-icon" >
                {disliked.isDisliked ? (
                  <AiTwotoneDislike onMouseOver={(e)=>handleLikeDislikeTrue('Can Dislike once')} onMouseOut={handleLikeDislikeOut} />
                ) : (
                  <AiOutlineDislike onClick={disLikeHandler} />
                )}
                <span>{jobDetail.dislike}</span>
              </i>
            </div>
            <h3>{jobDetail.job_title}</h3>
            <h5>{jobDetail.company || "company"}</h5>
            <div className="job-detail-icon-cn">
              <p>
                <i>
                  <BiShoppingBag className="detail-icon" />
                </i>
                <span>
                  {jobDetail.work_exp.minExp} - {jobDetail.work_exp.maxExp}{" "}
                  Years
                </span>
              </p>
              <p>
                <i>
                  <BiRupee className="detail-icon" />
                </i>
                <span>
                  {jobDetail.salaryRange
                    ? `${jobDetail.salaryRange.minSal} - ${jobDetail.salaryRange.maxSal} Lakh`
                    : `Not Disclosed`}
                </span>
              </p>
              <p>
                <i>
                  <BiLocationPlus className="detail-icon" />
                </i>
                <span>{jobDetail.location}</span>
              </p>
            </div>
            <div className="job-posting-date">
              <i>
                <CiCalendarDate className="detail-icon" />
              </i>
              {jobDetail.postedDate.slice(0, 10)}
            </div>
          </div>
          <div className="job-desc">
            <h4>Job description</h4>
            <div>
              <h4>Roles and Responsiblities</h4>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do
                </li>
                <li>
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                </li>
                <li>
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                </li>
                <li>
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris
                </li>
                <li>
                  in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat
                </li>
                <li>
                  nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident,
                </li>
                <li>
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </li>
              </ul>
            </div>
            <div>
              <h4>Education :</h4>
              <span>{jobDetail.education.graduation}</span>
            </div>
            <div className="tag-cn">
              <h4 className="tag-h4">Key Skill</h4>
              {jobDetail.skills.map((tag, index) => {
                return (
                  <p className="tag-p" key={index}>
                    {tag}
                  </p>
                );
              })}
            </div>
            <button id="disabled" onClick={jobApplyhandler}>
              {isApplied ? `Applied` : `Apply`}
            </button>
          </div>
        </section>
        <section>
          <h1>Similar Jobs</h1>
          {similarJob.map((item, index) => {
            const {
              _id,
              company,
              location,
              job_title,
              work_exp,
              salaryRange,
              postedDate,
              skills,
            } = item;

            var days = postedDate.slice(0, 10);

            return (
              <JobCard
                key={index}
                id={_id}
                company={company}
                location={location}
                title={job_title}
                minExp={work_exp.minExp}
                maxExp={work_exp.maxExp}
                salarymin={salaryRange.minSal}
                salarymax={salaryRange.maxSal}
                date={days}
                skills={skills}
              />
            );
          })}
        </section>
      </div>
    );
  }
};

export default JobDetail;
