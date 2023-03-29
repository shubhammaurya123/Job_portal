import React, { useEffect, useState } from 'react';
import CreatableSelect from "react-select/creatable";
import useFetch from '../controllers/useFetch';

const locationOption = [
  { value: "Banglore", label: "Banglore" },
  { value: "Pune", label: "Pune" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Noida", label: "Noida" },
  { value: "Delhi", label: "Delhi" },
];



function CustomSelectForm({handleOptionChange}) {
  const [locationOptionDb ,setLocationOption] = useState(locationOption)
  const [locationData ,isLocationLoading] = useFetch("http://localhost:9002/admin/location")


useEffect(()=>{
  if(!isLocationLoading){
    const dataArray = []
    locationData.forEach(element=>{
      dataArray.push({value:element.location ,label:element.location})
    })
    setLocationOption(dataArray)
  }
  console.log(locationOptionDb)
},[locationData])

  return <CreatableSelect
  options={locationOptionDb}
  onChange={(selectedOption)=>handleOptionChange(selectedOption)}
  placeholder='Location'
  unstyled
  >
  </CreatableSelect>;
}

export default CustomSelectForm;
