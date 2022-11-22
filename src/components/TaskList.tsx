import { Circle, Trash } from 'phosphor-react'
import { useState } from 'react'
import styles from './TaskList.module.css'

interface ITaskList {
  content: string
  onDeleteTask: (content: string) => void
  onFinishedTask: (content: any) => void
}

const TaskList = ({ content, onDeleteTask, onFinishedTask }: ITaskList) => {
  const [btnStart, setBtnStart] = useState(false)

  function handleDeleteOneTask() {
    onDeleteTask(content)
  }

  const taskCompleted = btnStart ? styles.active : styles.content

  const handleFinishedTask = () => {
    setBtnStart(!btnStart)

    if (btnStart === false) {
      onFinishedTask((prevState: number) => prevState + 1)
    } else {
      onFinishedTask((prevState: number) => prevState - 1)
    }
  }

  return (
    <div className={styles.container}>
      <div className={taskCompleted}>
        <button onClick={handleFinishedTask} className={styles.check}>
          <Circle size={24} />
        </button>
        <p>{content}</p>
        <button onClick={handleDeleteOneTask} className={styles.trash}>
          <Trash size={24} />
        </button>
      </div>
    </div>
  )
}

export default TaskList
