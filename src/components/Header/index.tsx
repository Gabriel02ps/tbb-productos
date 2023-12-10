import styles from "./styles.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src="/icons/logo.png" alt="TBB Logo" />
      </div>
    </header>
  )
}
