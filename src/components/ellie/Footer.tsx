import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.hairline} />
      <div className={styles.inner}>
        <img
          src="/esl_license.png"
          alt="Essence Source License seal"
          className={styles.seal}
        />
        <div className={styles.copy}>
          <div className={styles.line1}>
            © 2026 eLLiE Agentic Protocols. EVMG Technologies. All rights reserved.
          </div>
          <div className={styles.line2}>
            Powered by Solana Mainnet-Beta&nbsp;&nbsp;|&nbsp;&nbsp;Supported by Superteam
          </div>
        </div>
      </div>
    </footer>
  );
}
