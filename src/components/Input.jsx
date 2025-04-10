import React, { useState, useEffect } from "react";
import Submit from "./Submit";
import Trips from "./Trips";
import { getTripsFromClaude } from "./ai";

export default function Input() {
    const [details, setDetails] = useState(["Budget 5000 dollars", "Something in the East", "Trip should be around 4 days"]);
    const [hoveredStates, setHoveredStates] = useState([]);

    useEffect(() => {
        // Synchronize hoveredStates with details length
        setHoveredStates(Array(details.length).fill(false));
    }, [details]);

    const detailListItems = details.map((detail, index) => (
        <li 
            key={detail} 
            onClick={() => deleteDetail(index)}
            onMouseOver={() => toggleHover(index, true)}
            onMouseOut={() => toggleHover(index, false)}
            className={`setWidth ${hoveredStates[index] ? "red-text" : "black-text"}`}
        >
            {detail}
        </li>
    )); 

    const [trips, setTrips] = useState("");

    function addDetail(formData) {
        const newDetail = formData.get("detail");
        if (newDetail.trim() !== "") {
            setDetails(prevDetails => [...prevDetails, newDetail]);
        }
    }

    function deleteDetail(index) {
        setDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
    }

    async function getTrip() {
        // alert("Fetching trip suggestions...");
        try {
            const generatedTrips = await getTripsFromClaude(details);
            setTrips(generatedTrips);
            // alert("Trip suggestions generated!");
        } catch (error) {
            // alert("Error fetching trips. Please try again later.");
            console.error(error);
        }
    }

    function toggleHover(index, isHovered) {
        setHoveredStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = isHovered;
            return newStates;
        });
    }

    return (
        <div id="input-div">
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    addDetail(new FormData(e.target));
                    e.target.reset();
                }}
                id="input-form"
            >
                <input name="detail" id="input-detail" placeholder="e.g. Budget" autoComplete="off" />
                <input id="input-add" type="submit" value="+ Add detail" />
            </form>
            {details.length > 0 && <p id="details-head">Current trip details:</p>}

            <ul id="detail-list">
                {detailListItems}
            </ul>

            <Submit len={details.length} handleClick={getTrip} />

            {trips && <Trips tripsData={trips} />}
        </div>
    );
}
