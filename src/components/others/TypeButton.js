import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const options = ['物资', '物资交换', '普通求助', '医疗求助', '其他'];

// eslint-disable-next-line no-unused-vars
const TypeButton = ({ type, setType }) => {
  const [selected, setSelected] = useState(type);

  useEffect(() => {
    // setLicense(options[selectedIndex]);
    setType(type);
  }, [selected]);

  const handleToggle = (option) => {
    setSelected(option);
    setType(option);
  };

  return (
    <div className="license-btn">
      <div className="dropdown">
        <button className="dropbtn container-row-searchbar" type="button">
          {selected}
          <ArrowDropDownIcon />
        </button>
        <div className="dropdown-content">
          {options.map((option) => (
            <button key={option} className="content-dropbtn" type="button" onClick={() => handleToggle(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeButton;
