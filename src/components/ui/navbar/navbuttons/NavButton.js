import styles from "./NavButton.module.css";

const NavButton = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className={styles["button"]}>
            {children}
        </button>
    )
}

export default NavButton
