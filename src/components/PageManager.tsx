import { Fragment } from "react/jsx-runtime"

type PageManagerProps = {
    todosPerPage: number,
    todos: unknown[],
    paginate: (pageNumber: number) => void,
    handletodosPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const PageManager = ({
    todosPerPage,
    todos,
    paginate,
    handletodosPerPage
}: PageManagerProps) => {
  return (
    <Fragment>
        <div className="flex items-center justify-between space-x-4">
            <label htmlFor="todosPerPage">Mostra</label>
            <select 
                name="todosPerPage" 
                id="todosPerPage"
                value={todosPerPage}
                onChange={handletodosPerPage}>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
            <label htmlFor="todosPerPage">task su {todos.length}</label>
        </div>
        <div className="flex items-center justify-between space-x-4">
            {
                Array.from({length: Math.ceil(todos.length / todosPerPage)}).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className="btn-primary"
                    >
                        {index + 1}
                    </button>
                ))
            }
        </div>
    </Fragment>
  )
}
