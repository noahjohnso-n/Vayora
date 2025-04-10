import React, { useState, useEffect } from "react";
import Submit from "./Submit";
import Trips from "./Trips";
import { getTripsFromClaude } from "./ai";

export default function Input() {
    const [details, setDetails] = useState(["Budget 5000 dollars", "Something in the East", "Trip should be around 4 days"]);
    const [hoveredStates, setHoveredStates] = useState([]);
    const [trips, setTrips] = useState("");
    const [loading, setLoading] = useState(false); // New loading state

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

    function addDetail(formData) {
        const newDetail = formData.get("detail");
        if (newDetail.trim() !== "") {
            setDetails((prevDetails) => [...prevDetails, newDetail]);
        }
    }

    function deleteDetail(index) {
        setDetails((prevDetails) => prevDetails.filter((_, i) => i !== index));
    }

    async function getTrip() {
        setLoading(true); // Show loading indicator
        try {
            const generatedTrips = await getTripsFromClaude(details);
            setTrips(generatedTrips);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    }

    function toggleHover(index, isHovered) {
        setHoveredStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = isHovered;
            return newStates;
        });
    }

    return (
        <>
        <div className="vayora-desc">
            <h1 className="vayora-d">Welcome to Vayora! Your AI trip generator! Enter the details of your future trip, click get trips, and see all the places you can go! </h1>
        </div>
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
                <input id="input-add" type="submit" value="+" />
            </form>
            {details.length > 0 && <p id="details-head">Current trip details:</p>}

            <ul id="detail-list">{detailListItems}</ul>

            <Submit len={details.length} handleClick={getTrip} />

            {loading && <p className="load-buffer">Loading...</p>}
            {trips && <Trips tripsData={trips} />}
        </div>
        </>
    );
}
