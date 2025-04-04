import React, { useState, useEffect, useRef } from "react";
import styles from "./SkipSelector.module.scss";
import { SkipDetails } from "../SkipDetails/SkipDetails";

const SkipSelector = ({ selectedContent, setSelectedContent }) => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [infoOpen, setInfoOpen] = useState(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchSkips = async () => {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        if (!response.ok) throw new Error("Failed to fetch skips");

        const data = await response.json();
        if (!data.length)
          throw new Error("No skips available at this location");

        console.log(data);
        setSkips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, [selectedContent]);

  const handleSelect = (skip) => setSelectedContent(skip);

  return (
    <div className={styles.container}>
      <div className={styles.skipHeader}>
        <div
          className={styles.skipHeaderFilter}
          style={{ backgroundImage: "url('/assets/skip.jpg')" }}
        ></div>
        <div className={styles.skipTitle}>Choose Your Skip Size</div>
        <div className={styles.skipSubtitle}>
          Select the skip size that best fits your needs.
        </div>
      </div>
      {loading && <p className={styles.loading}>Loading skips...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {skips.length > 0 && (
        <div className={styles.skipList}>
          {skips.map((skip, skipIndex) => (
            <>
              <div
                key={skip.id}
                className={`${styles.skipRow} ${
                  selectedContent?.id === skip.id ? styles.selectedSkip : ""
                }`}
              >
                <div className={styles.skipExpand}>
                  {infoOpen === skipIndex && (
                    <img
                      className={styles.detailsArrow}
                      src="/assets/down.png"
                      alt="↓"
                      onClick={() => setInfoOpen(null)}
                    />
                  )}
                  {infoOpen !== skipIndex && (
                    <img
                      className={styles.detailsArrow}
                      src="/assets/right.png"
                      alt="→"
                      onClick={() => setInfoOpen(skipIndex)}
                    />
                  )}
                </div>
                <div
                  className={styles.skipRowData}
                  onClick={() => handleSelect(skip)}
                >
                  <div className={styles.skipName}>
                    <h3>{skip.size} Yards</h3>
                  </div>
                  <p className={styles.skipPrice}>
                    £{" "}
                    {(
                      skip.price_before_vat +
                      (skip.price_before_vat * skip.vat) / 100
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              {infoOpen === skipIndex && <SkipDetails infoOpen={skip} />}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkipSelector;
