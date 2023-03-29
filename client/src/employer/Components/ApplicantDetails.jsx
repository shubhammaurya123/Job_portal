import { useEffect, useState } from "react"

const ApplicantDetails = ({ applicant }) => {

    const [details, setdetails] = useState()

    const getDetails = async (id) => {
        const res = await fetch('http://localhost:9002/employer/api/applicantDetails', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                applicant_id: id
            })
        })

        const data = await res.json()

        if (data.status === 'ok') {
            setdetails(data.applicant)
            // console.log(data)
            // return (data.applicant)
        }
        else {
            console.log('Error')
        }
        // else return "Couldnt Connect"
    }

    useEffect(() => {
        getDetails(applicant)
    }, [])


    return (
        <div>
            <h4>ApplicantDetails</h4>
            <p>{details?.name}</p>
            <p>{details?.email}</p>
            <p>{details?.resume}</p>
            <p>{details?.profileVideoLink}</p>
        </div>
    )
}

export default ApplicantDetails