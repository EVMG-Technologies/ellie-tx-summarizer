import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img
            src="/ellie_logo.png"
            alt="eLLiE wolf emblem"
            className={styles.logo}
          />
          <span className={styles.brandText}>
            eLLiE <span className={styles.divider}>|</span>{" "}
            <span className={styles.brandSub}>Agentic Intelligence</span>
          </span>
        </div>
      </div>
    </header>
  );
}
