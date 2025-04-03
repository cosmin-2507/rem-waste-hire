import React, {useState} from "react";
import SkipSelector from "../SkipSelector/SkipSelector";
import StepsScreen from "../StepsScreen/StepsScreen";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import {STEPS} from "../../shared/constants";
import NonImplementedStep from "../NonimplementedStep/NonImplementedStep";

import styles from "./Main.module.scss";

const Main = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedContent, setSelectedContent] = useState({
        size: null,
        priceBeforeVat: 0,
        vat: 0
    });

    const currentStepName = () => {
        return STEPS[currentPage];
    }

    const nextPage = () => {
        if (currentPage < STEPS.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles.mainWrapper}>
            <StepsScreen currentPage={currentPage}/>
            <div className={styles.content}>
                {currentStepName() === "Select Skip" && (
                    <SkipSelector selectedContent={selectedContent} setSelectedContent={setSelectedContent}/>
                )}
                {currentStepName() !== "Select Skip" &&(
                    <NonImplementedStep stepName={currentStepName()}/>
                )}
            </div>

            <div className={styles.mainFooter}>
                <NavigationButtons selectedContent={selectedContent} nextPage={nextPage} prevPage={prevPage}/>
            </div>

        </div>
    );
};

export default Main;
