import { Link } from "react-router-dom";
import img from '../../assets/imgMainPage.jpg';
import styles from './MainPage.module.css';

const MainPage = () => {
return (
    <div className={styles.mainPageWrapper}>
        <img src={img} alt="Todo list" />
        <Link to='/todos'><button>Todo List</button></Link>
        
    </div>
);
};

export default MainPage;