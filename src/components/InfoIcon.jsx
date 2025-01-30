import React from "react";
import { useState } from "react";
import "./InfoIcon.css"


export default function InfoIcon({helpText="", helpModalContents=null}) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div className="info-icon-container"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        // onClick={() => setIsTooltipVisible(!isTooltipVisible)}
        >
            <div className="info-icon-icon">❓</div>
            {isTooltipVisible ? <div className="info-icon-tooltip">{helpText}</div> : null}
            
        </div>
    );
};