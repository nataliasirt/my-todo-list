
import { Link } from "react-router-dom";
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.headerWrapper}>
            <Link to="/"><button className={styles.logoBtn}></button></Link>
        </header>
    );
}

export default Header;