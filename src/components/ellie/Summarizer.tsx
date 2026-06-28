import { useEffect, useState, type FormEvent } from "react";
import styles from "./Summarizer.module.css";

function truncate(sig: string) {
  if (sig.length <= 14) return sig;
  return `${sig.slice(0, 6)}…${sig.slice(-6)}`;
}

type Example = {
  label: string;
  signature: string;
  summary: string;
};

const EXAMPLES: Example[] = [
  {
    label: "Token Swap",
    signature:
      "5KtPn1LGuxhFiwjxErkxjbCN6JeFx9aJ4VajLgQQk2vQwjMmEpqHCmgYxk6tHvJ6JEr1F4f8GttCYiVQ9oZ4GZcG",
    summary:
      "Wallet 7xK…m4Vp swapped 12.50 USDC for 0.0842 SOL through the Jupiter aggregator, routed via the Raydium AMM. A network fee of 0.000005 SOL was paid and the transaction confirmed on the Solana mainnet.",
  },
  {
    label: "NFT Mint",
    signature:
      "2ZjTUjy5pXp5cQwQK6w3y8r1aXVc4hFh8YqYy3J9Vb1c8mPRkLcN3xQwE5tKfH8aD6bGzWp4mY9qVnL2uT7sR1eW",
    summary:
      "Wallet 9pL…q2Tn minted 1 NFT from the 'Mad Lads' collection on Metaplex Core, paying 1.45 SOL plus a 0.012 SOL creator royalty. The mint confirmed successfully and the NFT now resides in the buyer's wallet.",
  },
  {
    label: "Simple Transfer",
    signature:
      "4hMzJ8vQ3kKpD9LxR2wY6tNbFcG7sH1nXaUePfV8oT5iC9rB4mQ2yKjW7uZ3pA6dE1fX5sH8tY2nJqLrV9bWkM3o",
    summary:
      "Wallet A3f…k8Hq transferred 1.25 SOL to wallet B7m…p4Xs in a simple System Program transfer. The transaction paid a 0.000005 SOL network fee and confirmed on the Solana mainnet.",
  },
];

const LOADING_STEPS = [
  "Querying Solana Mainnet…",
  "Decoding Program Instructions…",
  "Running Agentic Analysis…",
  "Composing Intelligence Report…",
];

export function Summarizer() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);
  const [summarySig, setSummarySig] = useState<string>("");

  useEffect(() => {
    if (!loading) return;
    setLoadingStep(0);
    const id = window.setInterval(() => {
      setLoadingStep((s) => (s + 1) % LOADING_STEPS.length);
    }, 850);
    return () => window.clearInterval(id);
  }, [loading]);

  const runSummary = (sig: string, presetSummary?: string) => {
    if (!sig || loading) return;
    setValue(sig);
    setLoading(true);
    setSummary(null);
    const delay = 500;
    window.setTimeout(async () => {
      try {
        if (presetSummary) {
          setSummary(presetSummary);
          setSummarySig(sig);
        } else {
          const res = await fetch('/api/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ signature: sig })
          });
          const text = await res.text();
          let data;
          try {
            data = JSON.parse(text);
          } catch (e) {
            throw new Error('Received invalid response from server. Please ensure this is a valid Solana transaction hash.');
          }
          if (!res.ok) throw new Error(data.error || 'Failed to fetch summary');
          
          setSummary(data.summary);
          setSummarySig(data.signature);
        }
      } catch (err: any) {
        setSummary(`Error: ${err.message}`);
        setSummarySig(sig);
      } finally {
        setLoading(false);
      }
    }, delay);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const sig = value.trim();
    if (!sig) return;
    const match = EXAMPLES.find((ex) => ex.signature === sig);
    runSummary(sig, match?.summary);
  };

  const handleExample = (ex: Example) => {
    runSummary(ex.signature, ex.summary);
  };

  return (
    <section className={styles.wrap}>
      <div className={styles.hero}>
        <div className={styles.medallion}>
          <span className={`${styles.ring} ${styles.ringOuter}`} />
          <span className={`${styles.ring} ${styles.ringInner}`} />
          <img
            src="/ellie_logo.png"
            alt="eLLiE wolf emblem"
            className={styles.medallionImg}
          />
        </div>
        <h1 className={styles.brand}>eLLiE</h1>
        <p className={styles.tagline}>Solana Transaction Summarizer</p>
      </div>

      <form className={styles.formWrap} onSubmit={handleSubmit}>
        <div
          className={`${styles.formGlow} ${loading ? styles.formGlowActive : ""}`}
          aria-hidden="true"
        />
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="ellie-sig">
              Network Protocol · Solana Mainnet
            </label>
            <input
              id="ellie-sig"
              type="text"
              className={styles.input}
              placeholder="Paste Solana Transaction Signature…"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={!value.trim() || loading}
          >
            <span className={styles.buttonInner}>
              {loading ? (
                <>
                  <span className={styles.loadingPulse} aria-hidden="true" />
                  <span className={styles.loadingText}>
                    {LOADING_STEPS[loadingStep]}
                  </span>
                </>
              ) : (
                <>
                  Summarize
                  <svg
                    className={styles.buttonArrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
          </button>

          <div className={styles.scanLine}>
            <span className={styles.scanLineShimmer} />
          </div>
        </div>
      </form>

      <div className={styles.examples}>
        <span className={styles.examplesLabel}>Try an example</span>
        <div className={styles.examplesList}>
          {EXAMPLES.map((ex, i) => (
            <span key={ex.label} className={styles.examplesItem}>
              {i > 0 && <span className={styles.examplesDivider}>|</span>}
              <button
                type="button"
                className={styles.exampleLink}
                onClick={() => handleExample(ex)}
                disabled={loading}
              >
                {ex.label}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.statusRow}>
        <div className={styles.statusLeft}>
          <span className={styles.statusDot} />
          <span>Agent Status · Synchronized</span>
        </div>
        <div className={styles.statusRight}>v1.0.4 · agentic neural net</div>
      </div>

      <div
        className={`${styles.output} ${summary ? styles.outputVisible : ""}`}
        aria-live="polite"
      >
        {summary && (
          <>
            <div className={styles.outputHead}>
              <span className={styles.outputLabel}>Intelligence Report</span>
              <span className={styles.outputPill}>{truncate(summarySig)}</span>
            </div>
            <p className={styles.outputText}>{summary}</p>
            <div className={styles.outputFoot}>
              <a
                className={styles.verifyLink}
                href={`https://solscan.io/tx/${summarySig}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify on Solscan
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={styles.verifyArrow}
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
