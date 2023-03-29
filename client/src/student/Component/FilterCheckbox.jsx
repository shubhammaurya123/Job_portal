import React from 'react'

function FilterCheckbox({Headerlabel,option,handleCheckbox,name,list,styleClass}) {
  return (
    <form className={`${styleClass}`}>
          <label>{Headerlabel}</label>
          {option.map((opt,index) => {
            const { label, value } = opt;
            let valueChecked = value.toString()
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  value={value}
                  onChange={(e)=>handleCheckbox(e)}
                  name={name}
                  checked={list.includes(valueChecked)}
                  list={list}
                ></input>
                <label>{label}</label>
              </div>
            );
          })}
        </form>
  )
}

export default FilterCheckbox