import React, { useEffect, useState } from "react";
import "./SkillTagInput.css";
import { RxCross2 } from "react-icons/rx";
const SkillTagsInput = (props) => {
  const { tags, setTags } = props;
  const [skillsInDB, setSkillsInDB] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);



  function handleInputChange(event) {
    const userInput = event.target.value.toLowerCase();
    setInputValue(userInput);

    const matchingSuggestions = skillsInDB.filter((item) =>
      item.SuggSkill.toLowerCase().includes(userInput)
    );
    console.log(matchingSuggestions);
    setSuggestions(matchingSuggestions);
  }

  function handleSuggestionClick(event) {
    setInputValue(event.target.textContent);
    setSuggestions([]);
  }

  
  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };
  const SuggestionSkill = async () => {
    const req = await fetch(`http://localhost:9002/employer/api/suggSkill`);
    const jsonData = await req.json();

    setSkillsInDB(jsonData);
    console.log(skillsInDB);
  };
  useEffect(() => {
    SuggestionSkill();
  }, []);
  return (
    <div className="tags-input">
      <input
        className="input-aria"
        placeholder="Add More Skills"
        type={props.type}
        onKeyUp={(event) => addTags(event)}
        value={inputValue}
        onChange={handleInputChange}
      />
       {suggestions.length > 0 && (
        <ul className="showTags1">
          {suggestions.map((suggestion , index) => (
            <li key={index} onClick={handleSuggestionClick} className="tag-style1">
                 {suggestion.SuggSkill}
                 <hr/>
            </li>
           

          ))}
        </ul>
      )}

      <ul className="showTags">
        {tags.map((tag, index) => (
          <li key={index} className="tag-style">
            <span>{tag}</span>
            <i className="material-icons" onClick={() => removeTags(index)}>
              <RxCross2 className="cross-tag" />
            </i>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SkillTagsInput;
