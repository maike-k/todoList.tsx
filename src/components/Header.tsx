import styles from './Header.module.css'
import { Rocket } from 'phosphor-react'
const Header = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Rocket className={styles.rocket} size={36} />
          <h1>todo</h1>
        </header>
      </div>
    </div>
  )
}

export default Header
