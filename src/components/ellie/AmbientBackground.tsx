import styles from "./AmbientBackground.module.css";

/**
 * Ambient background: layered blurred gold glows, fine dot grid, and
 * slow-drifting gold contour lines drawn as SVG for crisp scaling.
 */
export function AmbientBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={`${styles.blob} ${styles.blobA}`} />
      <div className={`${styles.blob} ${styles.blobB}`} />
      <div className={`${styles.blob} ${styles.blobC}`} />
      <div className={styles.dots} />

      <svg
        className={styles.contours}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ellieContour" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="50%" stopColor="#f5d17e" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className={styles.contourGroup} stroke="url(#ellieContour)" fill="none">
          <path
            className={styles.line1}
            d="M-200,520 C200,360 480,640 760,480 S1240,300 1640,460"
            strokeWidth="1"
          />
          <path
            className={styles.line2}
            d="M-200,560 C220,420 500,680 780,520 S1260,360 1640,500"
            strokeWidth="0.8"
          />
          <path
            className={styles.line3}
            d="M-200,600 C240,480 520,720 800,560 S1280,420 1640,540"
            strokeWidth="0.7"
          />
          <path
            className={styles.line4}
            d="M-200,460 C180,300 460,580 740,420 S1220,240 1640,400"
            strokeWidth="0.6"
          />
          <path
            className={styles.line5}
            d="M-200,640 C260,540 540,760 820,600 S1300,480 1640,580"
            strokeWidth="0.5"
          />
        </g>
      </svg>

      <div className={styles.vignette} />
    </div>
  );
}
