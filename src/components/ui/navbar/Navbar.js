import styles from "./Navbar.module.css";
import NavButton from "./navbuttons/NavButton";
import NavDropdown from "./navbuttons/NavDropdown";

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <span className={styles["navbar__logo"]}>
        <h2>Pathfinding Algorithms 🐭</h2>
      </span>
      <span className={styles["navbar__control"]}>
        <NavDropdown />
        <NavButton>Run pathfinder!</NavButton>
        <NavButton>Reset grid</NavButton>
        <NavButton>Clear grid</NavButton>
      </span>
    </nav>
  );
};

export default Navbar;
