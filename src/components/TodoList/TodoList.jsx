import PropTypes from 'prop-types';
import TodoListItem from "../TodoListItem/TodoListItem";

const FILTER_MAP = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed,
};

const TodoList = ({ todoList, onRemoveTodo, onEditTodo, onChangeStatus, filter }) => {
    return (
        <ul>
            {todoList.filter(FILTER_MAP[filter]).map(todo => {
                return (
                    <TodoListItem key={todo.id} {...todo}
                        onRemoveTodo={onRemoveTodo}
                        onEditTodo={onEditTodo}
                        onChangeStatus={onChangeStatus} />
                );
            })}
        </ul>
    );
}

TodoList.propTypes = {
    todoList: PropTypes.array,
    onRemoveTodo: PropTypes.func,
    onEditTodo: PropTypes.func,
    onChangeStatus: PropTypes.func,
    filter:PropTypes.string,
}

export default TodoList;