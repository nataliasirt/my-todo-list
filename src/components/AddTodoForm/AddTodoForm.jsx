import InputWithLabel from "../InputWithLabel/InputWithLabel";
import PropTypes from 'prop-types';
import styles from './AddTodoForm.module.css';
import { useState } from "react";

const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState('');
    
    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };
    
    const handleAddTodo = (event) => {
        event.preventDefault();
        todoTitle.trim() ? onAddTodo(todoTitle) : alert('Please add to-do');
        setTodoTitle('');
    };
    
    return (
        <form onSubmit={handleAddTodo} className={styles.form}>
            <InputWithLabel 
                id="todoTitle"
                type="text"
                name="title"
                onChange={handleTitleChange} 
                value={todoTitle}
                placeholder="Add New Todo"
                >
                </InputWithLabel> 
            <button type="submit">Add</button>
        </form>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func
};
export default AddTodoForm;