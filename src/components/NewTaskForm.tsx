import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './NewTaskForm.module.css'

interface TaskFormProps {
  onAddTask: (task: string) => void;
}

export function NewTaskForm({ onAddTask }: TaskFormProps) {
  const [newTask, setNewTask] = useState('');

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.currentTarget.value);
  }

  function handleAddTask(event: FormEvent) {
    event.preventDefault();

    onAddTask(newTask);
    setNewTask('');
  }

  function handleInvalidTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  return (
    <form onSubmit={handleAddTask}>
      <input
        className={styles.formInput}
        type="text"
        value={newTask}
        onChange={handleNewTaskChange}
        onInvalid={handleInvalidTask}
        placeholder="Adicione uma nova tarefa"
        required
      />
      <button type="submit">Criar <PlusCircle size={16} /></button>
    </form>
  )
}