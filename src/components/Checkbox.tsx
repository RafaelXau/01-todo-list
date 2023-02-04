import { CheckCircle, Circle } from "phosphor-react";

import styles from './Checkbox.module.css'

interface CheckboxProps {
  taskId: number;
  isComplete: boolean;
  onCompleteTask: (taskId: number) => void;
}

export function Checkbox({ isComplete, onCompleteTask, taskId }: CheckboxProps) {

  function handleDeleteTask() {
    onCompleteTask(taskId);
  }

  if (isComplete) {
    return (
      <CheckCircle
        className={styles.complete}
        weight="fill"
        size={18}
        onClick={handleDeleteTask}
      />
    )
  }

  return (
    <Circle
      className={styles.notComplete}
      size={18}
      onClick={handleDeleteTask}
    />
  )
}