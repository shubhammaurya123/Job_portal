import React from "react";
import { useState ,useEffect} from "react";




const TrendingProfile = ()=>{
    const [topProfiles ,setTopProfiles] = useState();
    useEffect(()=>{
        fetchData();
        },[])
   const fetchData = async () => {
           const response = await fetch("http://localhost:9002/admin/top_Profile");
           const topProfileData = await response.json();
           setTopProfiles(topProfileData.topProfileDetail)
    };
        
const testHandler = ()=>{
    //
}
    return(
        <>
        <h2>Top Trending Profile Today</h2>
        <section style={{display:"flex" ,justifyContent:"space-evenly",flexWrap:'wrap'}}>
            {
               topProfiles&&  topProfiles.map((item,index)=>{
                         const {_id,profileTitle ,openings} = item;
                         return(
                            <div className="profile-item" key={_id}>
                            <p>{profileTitle}</p>
                            <p>{openings}+</p>
                            <a href="/student/job" onClick={testHandler}>Go</a>
                        </div>
                         )
                })
            }
      
       
        </section>
  
        </>
    )
}


export default TrendingProfile;