import ReactMarkdown from "react-markdown";

export default function Trips(props){
    return (
        <div id = "ai-trips">
            <ReactMarkdown>{props.tripsData || ""}</ReactMarkdown> 
        </div>
    )
}