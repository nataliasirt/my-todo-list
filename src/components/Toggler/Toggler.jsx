/* eslint-disable no-unused-vars */
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import styles from './Toggler.module.css';
import {useThemeMode} from '../../hooks/useThemeMode';

const ThememodeToggler = () => {
    const { theme, setTheme } = useThemeMode();

    const handleLightTheme = () => {
        setTheme('light')
    }
    const handleDarkTheme = () => {
        setTheme('dark')
    }
    return (
        <div className={styles.buttonGroup}>
            <button className={styles.leftBtn} onClick={handleLightTheme}><MdLightMode /></button>
            <button className={styles.rightBtn} onClick={handleDarkTheme}><MdDarkMode /></button>
        </div>);
};

export default ThememodeToggler;
