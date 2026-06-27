import { useEffect, useState } from "react";
import styles from "./LiveData.module.css";

function formatUTC(d: Date) {
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss} UTC`;
}

export function LiveData() {
  const [time, setTime] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    setTime(formatUTC(new Date()));
    const id = window.setInterval(
      () => setTime(formatUTC(new Date())),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);


  useEffect(() => {
    let cancelled = false;
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
        );
        const json = await res.json();
        const p = json?.solana?.usd;
        if (!cancelled && typeof p === "number") setPrice(p);
      } catch {
        /* keep last */
      }
    };
    fetchPrice();
    const id = window.setInterval(fetchPrice, 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className={styles.wrap} aria-label="Live network data">
      <div className={styles.item}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>SOL</span>
        <span className={styles.value}>
          {price !== null
            ? `$${price.toFixed(2)}`
            : "$—"}
        </span>
      </div>
      <span className={styles.sep} aria-hidden="true" />
      <div className={styles.item}>
        <span className={styles.value} suppressHydrationWarning>
          {time ?? "--:--:-- UTC"}
        </span>

      </div>
    </div>
  );
}
