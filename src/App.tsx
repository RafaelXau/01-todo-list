import { useState } from 'react'
import { Header } from './components/Header'

import styles from './App.module.css'
import { NewTaskForm } from './components/NewTaskForm';
import { ClipboardText, Trash } from 'phosphor-react';
import { Checkbox } from './components/Checkbox';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const orderedTasks = tasks.sort(task => task.isComplete ? 1 : -1);

  const totalTasks = tasks.length;
  const totalCompletedTasks = tasks.filter(task => task.isComplete).length;
  const totalCompletedTasksText = totalCompletedTasks === 0
    ? '0'
    : `${totalCompletedTasks} de ${totalTasks}`;

  function onAddTask(task: string) {
    const newTask = {
      id: Math.random(),
      title: task,
      isComplete: false,
    }

    setTasks([...tasks, newTask]);
  }

  function handleDeleteTask(taskId: number) {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function onCompleteTask(taskId: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isComplete: !task.isComplete,
        }
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>

        <NewTaskForm onAddTask={onAddTask} />

        <div className={styles.tasks}>
          <header>
            <strong className={styles.blue}>Tarefas criadas <span>{totalTasks}</span></strong>
            <strong className={styles.purple}>Concluídas <span>{totalCompletedTasksText}</span></strong>
          </header>

          {
            tasks.length === 0 ? (
              <div className={styles.emptyTasks}>
                <ClipboardText className={styles.icon} size={56} />
                <div>
                  <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
              </div>
            ) : (
              <ul className={styles.taskList}>
                {orderedTasks.map(task => (
                  <li key={task.id}>
                    <Checkbox
                      taskId={task.id}
                      isComplete={task.isComplete}
                      onCompleteTask={onCompleteTask}
                    />
                    <span className={task.isComplete ? styles.complete : undefined}>{task.title}</span>
                    <button onClick={() => handleDeleteTask(task.id)}><Trash size={14} /></button>
                  </li>
                ))}
              </ul>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default App
