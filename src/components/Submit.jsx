export default function Submit(props){
    return (
        props.len > 0 && <div id = "submit-div">
            <div id = "submit-container">
                <div className="sub-col" id = "submit-left">
                    <p id = "top-desc">Ready to see your trips? </p>
                    <p id = "bottom-desc">Generate vacations based on your details.</p>
                </div>
                <div className="sub-col" id = "submit-right">
                    <button id = "get-trip" onClick = {props.handleClick}>Get Trips</button>
                </div>
            </div>
        </div>
    )
}