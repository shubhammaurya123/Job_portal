import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const InterviewQuestion = () =>{
    const [searchParams] = useSearchParams();
    const [role ,setRole]  = useState(searchParams.get("role"))
    return <>
    <h2>Interview Question For {role}</h2>
    </>
}

export default InterviewQuestion;