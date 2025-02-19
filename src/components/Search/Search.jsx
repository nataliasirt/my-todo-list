import InputWithLabel from "../InputWithLabel/InputWithLabel";
import PropTypes from 'prop-types';
import styles from './Search.module.css';

const Search = ({onSearch, searchTerm}) => {
    const handleSearchInput = (event) => {
        onSearch(event.target.value);
    };
    
    return (
        <div className={styles.searchWrapper}>
            <InputWithLabel
            id="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchInput} 
            />
        </div>
        
    )
}

Search.propTypes = {
    onSearch: PropTypes.func,
    searchTerm: PropTypes.string
};

export default Search;