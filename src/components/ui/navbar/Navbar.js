import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <span className={styles["navbar__logo"]}>
        <h2>Pathfinding Algorithms 🐭</h2>
      </span>
      <span className={styles["navbar__control"]}>
        <span>Pick an algorithm</span>
        <span>Run pathfinder!</span>
        <span>Reset grid</span>
        <span>Clear grid</span>
      </span>
    </nav>
  );
};

export default Navbar;
