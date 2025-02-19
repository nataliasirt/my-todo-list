import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footerWrapper}>
            <p style={{ fontSize: '0.8em' }}>© {new Date().getFullYear()} · Todo App. All rights reserved.</p>
        </footer>

    )
}

export default Footer;