import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const options = ['不紧急', '紧急', '危急'];

// eslint-disable-next-line no-unused-vars
const EmergencyRateButton = ({ emergencyRate, setEmergencyRate }) => {
  const [selected, setSelected] = useState(emergencyRate);

  useEffect(() => {
    // setLicense(options[selectedIndex]);
    setEmergencyRate(emergencyRate);
  }, [selected]);

  const handleToggle = (option) => {
    setSelected(option);
    setEmergencyRate(option);
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

export default EmergencyRateButton;
