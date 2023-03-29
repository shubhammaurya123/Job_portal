import { useEffect, useState } from "react"

const Post = ({ email, details }) => {

    const [verified, setverified] = useState(false)

    useEffect(() => {
        if (details.postedBy.email == email) {
            setverified(true)
        } else {
            setverified(false)
        }
        // setverified(true)
    }, [])


    return (
        <div className={`jobPost ${verified == true ? "" : "blur"}`}>
            <p>Job Title : {details?.job_title}</p>
            <p>Posted By : {details?.postedBy?.name}, {details?.postedBy?.email}</p>
            <p>Employment Type : {details?.employment_type}</p>
            <p>Work From Home : {details?.wfh ? 'Yes' : 'No'}</p>
            <p>Job Description : {details?.job_desc}</p>
            <p>Skills : {details?.skills}</p>
            <button>View Details</button>
        </div>
    )
}

export default Post