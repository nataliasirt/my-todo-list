import { Link } from "react-router-dom";
import img from '../../assets/imgNotFoundPage.jpg';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={styles.notFoundPageWrapper}>
            <img src={img} alt="Error 404"/>
            <Link to="/">Back to main page</Link>
        </div>
    );
};

export default NotFoundPage;