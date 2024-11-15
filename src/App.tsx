import { ToDoContainer } from "./components/ToDoContainer"


function App() {

  
  return (
    <main>
      <div className="flex flex-col items-center space-y-4">
        <h1>ToDo App</h1>
        <p>Una semplice applicazione per una ToDo List in React con Typescript</p>
      </div>
	  <section className="flex justify-center mt-6">
		<ToDoContainer />
	  </section>
    </main>
  )
}

export default App
