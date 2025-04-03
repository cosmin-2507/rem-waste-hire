import React from "react";

import styles from "./NavigationButtons.module.scss";

const NavigationButtons = ({selectedContent, prevPage, nextPage}) => {
    return (
        <div className={styles.navigationWrapper}>
            <div>
                {selectedContent.size !== null && (
                    <span>
                     <strong>{selectedContent.size} Yards</strong> - £
                        {(
                            selectedContent.price_before_vat +
                            (selectedContent.price_before_vat * selectedContent.vat) / 100
                        ).toFixed(2)}
                    </span>
                )}
            </div>

            <div className={styles.actionsWrapper}>
                <button className={styles.backButton} onClick={prevPage}>
                    Back
                </button>
                <button onClick={nextPage} className={styles.continueButton}>
                Continue
                </button>
            </div>
        </div>
    );
};

export default NavigationButtons;
