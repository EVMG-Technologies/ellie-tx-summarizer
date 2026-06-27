import styles from "./Header.module.css";
import logoAsset from "../../assets/ellie_logo.png.asset.json";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img
            src={logoAsset.url}
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
