import PropTypes from 'prop-types';
import styles from './Sorting.module.css';

const Sorting = ({onSort}) => {
    const handleOption = (value) => {
        onSort(value);
    };
    
    return (
        <select id='sorting' className={styles.sorting} onChange={e => handleOption(e.target.value)}>
            <option value="titleAsc"> Sort by title (A-Z)</option>
            <option value="titleDesc">Sort by title (Z-A)</option>         
        </select>
    );
}

Sorting.propTypes = {
    onSort: PropTypes.func
};

export default Sorting;