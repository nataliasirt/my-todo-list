import PropTypes from 'prop-types';
import style from './Filter.module.css';

const FilterList = ({ setFilter, filter }) => {
    const buttonsData = [
        {id: 'All', label: 'All'},
        {id: 'Active', label: 'Active'},
        {id: 'Completed', label: 'Done'},
        
    ];

    const buttons = buttonsData.map(({id, label}) => {
        const active = filter === id;
        const clazz = active ? `${style.active}` : '';
        return (
            <button type="button" 
            className={`${style.button} ${clazz}`}
                    key={id}
                    onClick={() => setFilter(id)}>
                    {label}
            </button>
        )
    });
    
    return (
        <div>
            {buttons}
        </div>
    );
}

FilterList.propTypes = {
    setFilter: PropTypes.func,
    filter:PropTypes.string,
};
export default FilterList;