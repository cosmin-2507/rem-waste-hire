import styles from "./SkipDetails.module.scss";
import React from "react";

export const SkipDetails = ({ infoOpen }) => {
  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.detailsTags}>
        <strong>VAT:</strong>
        <strong>Hire Period:</strong>
        <strong>Transport Cost:</strong>
        <strong>Per Tonne Cost:</strong>
        <strong>Allowed on Road:</strong>
        <strong>Allows Heavy Waste:</strong>
      </div>
      <div className={styles.detailsValues}>
        <div>{infoOpen.vat}%</div>
        <div>{infoOpen.hire_period_days} days</div>
        <div>
          {infoOpen.transport_cost ? `£${infoOpen.transport_cost}` : "-"}
        </div>
        <div>
          {infoOpen.per_tonne_cost ? `£${infoOpen.per_tonne_cost}` : "-"}
        </div>
        <div>{infoOpen.allowed_on_road ? "Yes" : "No"}</div>
        <div>{infoOpen.allows_heavy_waste ? "Yes" : "No"}</div>
      </div>
    </div>
  );
};
