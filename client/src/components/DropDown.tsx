import React from "react";

const DropDown = () => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        Click
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
