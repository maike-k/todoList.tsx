import { ClipboardText, PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'

import styles from './TaskForm.module.css'
import TaskList from './TaskList'

const TaskForm = () => {
  const [task, setTask] = useState<string>('')
  const [newTask, setNewTask] = useState<string[]>([])
  const [countTasks, setCountTasks] = useState<number>(0)
  const [countTaskFinished, setCountTaskFinished] = useState<number>(0)

  const handleTask = (e: FormEvent) => {
    e.preventDefault()

    const taskAlreadyExist = newTask.find(taskValue => {
      return taskValue === task
    })

    if (!taskAlreadyExist) {
      setNewTask([...newTask, task])
    }

    setTask('')
  }

  const handleCreateNewTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value)
  }

  const handleDeleteTask = (taskToDelete: string) => {
    const tasksWithoutDeleteOne = newTask.filter(deleteTask => {
      return deleteTask !== taskToDelete
    })

    setNewTask(tasksWithoutDeleteOne)
    setCountTasks(countTasks - 1)
    setCountTaskFinished(countTaskFinished - 1)
  }

  const taskEmpty = task.length === 0

  return (
    <div className={styles.container}>
      <form onSubmit={handleTask} className={styles.taskForm}>
        <input
          type="text"
          value={task}
          onChange={handleCreateNewTask}
          placeholder="Adicione uma nova tarefa"
          required
        />
        <button type="submit" disabled={taskEmpty}>
          Criar <PlusCircle size={24} />
        </button>
      </form>
      <div className={styles.taskFormList}>
        <div>
          <article className={styles.button}>
            <span className={styles.created}>
              <p>Tarefas criadas</p>
              <button>{newTask.length}</button>
            </span>
            <span className={styles.published}>
              <p>Concluídas</p>
              <button>
                {countTaskFinished} de {newTask.length}
              </button>
            </span>
          </article>
        </div>
      </div>
      <div>
        {newTask.length > 0 ? (
          newTask.map(taskItem => {
            return (
              <TaskList
                key={taskItem}
                content={taskItem}
                onDeleteTask={handleDeleteTask}
                onFinishedTask={setCountTaskFinished}
              />
            )
          })
        ) : (
          <div className={styles.null}>
            <ClipboardText size={64} className={styles.clipboardText} />
            <h1>Você ainda não tem tarefas cadastradas</h1>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskForm
