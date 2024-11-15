import React, { Fragment } from 'react'
import { TodoItem } from '../types';
import { validateForm } from '../utils/validationSchema';
import {v4 as uuid} from 'uuid';

type ToDoFormProps = {
    todos: TodoItem[];
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

export const ToDoForm = ({todos, setTodos}: ToDoFormProps) => {
    const [error, setError] = React.useState<string | null>(null);
    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries()) as {todo: string};
        const {success, ...rest} = validateForm(formValues);
        if (!success && rest.error) {
            setError(rest.error.join(', '));
            return
        }
        const {todo} = formValues;
        const newToDo = {
            id: uuid(),
            item: todo,
            state: 'todo'
        } as unknown as TodoItem;

        setTodos([...todos, newToDo]);
        form.reset();
    }
  return (
    <Fragment>
        <form onSubmit={formHandler} className='flex space-x-4 mx-auto min-w-[576px]'>
                <label htmlFor="todo" className='w-full'>
                <input 
                    id='todo' 
                    name='todo'
                    type="text" 
                    disabled={!!error}
                    className='bg-neutral-900 p-4 rounded-md w-full' 
                    placeholder='Cosa devi fare?' 
                />
                <span className='sr-only'>Aggiungi un ToDo</span>
                </label>
                <button disabled={!!error} className={error ? 'btn-disabled cursor-not-allowed' : 'btn-primary'}>Aggiungi</button>
            </form>
            {error && <aside className='fixed bottom-4 right-4'>
                    <div className='p-4 bg-red-400 rounded-md shadow-md flex gap-4 items-center'>
                        <span className='text-white'>{error}</span>
                        <button onClick={() => setError(null)} className='bg-white text-black hover:bg-slate-200'>Chiudi</button>
                    </div>
                </aside>}
    </Fragment>
  )
}


