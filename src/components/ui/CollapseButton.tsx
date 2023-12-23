// CollapseButton.js
import React, { useState } from 'react';
import { Button } from './Button';

const CollapseButton = ({ onButtonClick }) => {
  return (
    <div className="app-container">
      <button onClick={onButtonClick} className="blur-button">
        <span className="plus-sign"></span>
      </button>
      <div className="additional-buttons">
        <Button className='ml-2'>Add Member</Button>
        <Button className='ml-2'>Add Member</Button>
      </div>
    </div>
  );
};

export default CollapseButton;
