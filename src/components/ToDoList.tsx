import { TodoItem } from "../types"

type ToDoListProps = {
    currentToDos: TodoItem[],
    updateToDo: (id: string) => void,
    removeToDo: (id: string) => void
}
export const ToDoList = ({currentToDos, ...rest}: ToDoListProps) => {
    return (
        <ul className="flex flex-col space-y-2 mt-4 w-full">
            {currentToDos.map((todo) => (<Item {...rest} key={todo.id} id={todo.id} item={todo.item} state={todo.state} />))}
        </ul>
    )
}

type ItemProps = TodoItem & Pick<ToDoListProps, 'updateToDo' | 'removeToDo'>
const Item = ({id, item, state, updateToDo, removeToDo }: ItemProps) => {
    return (
        <li className="flex justify-between items-center bg-neutral-800 p-2 rounded-md w-full border">
            <p>{item}</p>
            <div className="flex space-x-2 items-center">
                <button className={state === 'done' ? 'btn-secondary' : 'btn-primary'} onClick={() => updateToDo(id)}>
                    {state === 'done' ? '👎' : '👍'}
                </button>
                <button className="btn-danger" onClick={() => removeToDo(id)}>X</button>
            </div>
        </li>
    )
}