import React from "react";


const Collapsible = function({header, contents}) {

    const onCollapsibleClick = (e) => {
        e.target.classList.toggle('active');
        const contentDiv = e.target.nextElementSibling;

        if (contentDiv.style.maxHeight) {
            contentDiv.style.maxHeight = null;
        } else {
            contentDiv.style.maxHeight = '800px';
        }
    }

    return (
        <div className='collapsible-body'>
            <button className='collapsible-button' onClick={onCollapsibleClick}>{header}</button>
            <div className='collapsible-contents' >{contents}</div>
        </div>
    );
};

export default Collapsible;