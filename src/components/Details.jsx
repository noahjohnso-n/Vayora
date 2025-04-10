// import { useState, useEffect } from "react";

// export default function Details(props) {
//     const [items, setItems] = useState(props.items);
//     const [hoveredStates, setHoveredStates] = useState(Array(props.items.length).fill(false));

//     useEffect(() => {
//         setItems(props.items);
//         setHoveredStates(Array(props.items.length).fill(false));
//     }, [props.items]);

    function toggleHover(index, isHovered) {
        setHoveredStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = isHovered;
            return newStates;
        });
    }

//     return (
//         <ul id="detail-list">
//             {items.map((item, index) => (
//                 <li
//                     key={index}
//                     onMouseOver={() => toggleHover(index, true)}
//                     onMouseOut={() => toggleHover(index, false)}
//                     onClick={() => props.onDelete(index)}
//                     className={`setWidth ${hoveredStates[index] ? "red-text" : "black-text"}`}
//                 >
//                     {item}
//                 </li>
//             ))}
//         </ul>
//     );
// }

import React from "react";

export default function Details(props){


    return(
        <ul id = "detail-list">
            {props.detailListItems}
        </ul>
    )
}