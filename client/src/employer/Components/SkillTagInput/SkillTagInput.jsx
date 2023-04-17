import React from "react";
import './SkillTagInput.css'
import {RxCross2} from "react-icons/rx"
const SkillTagsInput = (props) => {
    const{tags , setTags} = props;
    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };
    return (
        <div className="tags-input">
            <input
              className="input-aria"
              placeholder="Add More Skills"
                type={props.type}
                onKeyUp={event => addTags(event)}
                
            />
            <ul className="showTags">
                {tags.map((tag, index) => (
                    <li key={index} className="tag-style">
                        <span>{tag}</span>
                        <i
                            className="material-icons"
                            onClick={() => removeTags(index)}
                        >
                            <RxCross2 className="cross-tag"/>
                        </i>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};
export default SkillTagsInput;