import React from 'react';
import waldo from '../../images/waldo-character.png';
import odlaw from '../../images/odlaw.jpg';
import wizard from '../../images/wizard.png';

interface StartMenuProps {
  start: () => void;
}

function StartMenu({ start }: StartMenuProps) {
  return (
    <div>
      <h1>Find From Picture</h1>
      <p>Find these characters as fast as possible from the picture</p>
      <div>
        <div>
          <img src={waldo} alt="Happy Waldo" />
          <p>Waldo</p>
        </div>
        <div>
          <img src={odlaw} alt="Happy Odlaw" />
          <p>Odlaw</p>
        </div>
        <div>
          <img src={wizard} alt="Happy Wizard" />
          <p>Wizard</p>
        </div>
      </div>
      <button onClick={start} type="button">
        START
      </button>
    </div>
  );
}

export default StartMenu;
