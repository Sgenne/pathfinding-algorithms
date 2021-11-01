import styles from "./Cell.module.css";

const validColors = [
  "white",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "black",
];

const Cell = ({
  color,
  height,
  width,
  onMouseDown,
  onRightClick,
  onMouseOver,
  onMouseUp,
}) => {
  const colorClass = validColors.includes(color) ? color : "";

  const rightClickHandler = (event) => {
    event.preventDefault();
    onRightClick();
  };

  return (
    <li
      className={`${styles["cell"]} ${styles[colorClass]}`}
      style={{ height: height, width: width }}
      onMouseDown={onMouseDown}
      onContextMenu={rightClickHandler}
      onMouseOver={onMouseOver}
      onMouseUp={onMouseUp}
    ></li>
  );
};

export default Cell;
