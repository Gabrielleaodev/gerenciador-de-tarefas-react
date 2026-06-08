import { useState } from 'react';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { v4 } from 'uuid';
import { useEffect } from 'react';


function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  useEffect(() => {
localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //FUNÇÃO PARA ATUALIZAR O ESTADO DAS TAREFAS, QUANDO CLICAR NA TAREFA, ELA VAI RECEBER O ID DA TAREFA CLICADA
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //PRECISO ATUALIZAR ESSA TAREFA, SE O ID FOR IGUAL AO ID DA TAREFA CLICADA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      //NÃO PRECISO ATUALIZAR ESSA TAREFA, ENTÃO RETORNO ELA COMO ESTÁ
      return task;
    });

    setTasks(newTasks);
  }

  function onDeliteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false
    }
    setTasks([...tasks, newTask]);
  }

  return (
    <div className='w-screen h-screen bg-slate-500 flex justify-center p-6'>
      <div className='w-[500px] space-y-4'>
        <h1 className='text-3xl text-slate-100 font-bold text-center'>
          Gerenciador de Tarefas</h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks}
          onTaskClick={onTaskClick}
          onDeliteTaskClick={onDeliteTaskClick} />
      </div>
    </div>
  );
}

export default App; 