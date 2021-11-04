import { useState } from "react";
import NavButton from "./NavButton";

import styles from "./NavDropdown.module.css";

const DUMMY_OPTIONS = [
  {
    text: "Dijkstra's Algorithm",
  },
  {
    text: "A*",
  },
];

const NavDropdown = () => {
  const [isHovering, setIsHovering] = useState(false);

  const mouseOverHandler = () => {
    setIsHovering(true);
  };

  const mouseOutHandler = () => {
    setIsHovering(false);
  };

  const dropdownOptions = DUMMY_OPTIONS.map((obj) => (
    <ul className={styles["dropdown__option"]} key={obj.text}>
      {obj.text}
    </ul>
  ));

  return (
    <span
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      className={styles["dropdown-container"]}
    >
      <NavButton>Pick an algorithm!</NavButton>
        <li className={styles["dropdown"] + " " + (isHovering ? styles["extended"] : "")}> {dropdownOptions} </li>
    </span>
  );
};

export default NavDropdown;
