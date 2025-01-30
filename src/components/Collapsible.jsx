import React from "react";
import './Collapsible.css'

const Collapsible = function({header, contents}) {

    const onCollapsibleClick = (e) => {
        const collapsible = e.target.parentElement;
        collapsible.classList.toggle('active'); //collapsible-body is active or inactive
        const contentDiv = e.target.nextElementSibling;

        // if (contentDiv.style.maxHeight) {
        //     contentDiv.style.maxHeight = null;
        // } else {
        //     contentDiv.style.maxHeight = '800px';
        // }

        // Close other sections
        document.querySelectorAll('.collapsible-body').forEach(s => {
            if (s !== collapsible) s.classList.remove('active');
        });
    }

    return (
        <div className='collapsible-body'>
            <div className='collapsible-button' onClick={onCollapsibleClick}>
                {header}<div id="arrow-thingy">▼</div>
            </div>

            <div className='collapsible-contents'>{contents}</div>
        </div>
    );
};

export default Collapsible;