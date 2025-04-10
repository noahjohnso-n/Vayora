import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = 
`You are an assistant that receives a list of details about a potential vacation that a user has and wants you to suggest potential vacations for them. 
You should include all of the users details in your response, but you should not ask for additional information.
Additionally, add an emoji of the country for the trip you're suggesting. Add a link to the city or place on tripadvisor. Format your response in markdown to make it easier to render to a web page.`;

const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
}); 

export async function getTripsFromClaude(tripDetails) {
    const detailString = tripDetails.join(", ");

    try {
        const msg = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                { role: "user", content: `I have ${detailString}. Please give me vacation trip suggestions!` },
            ],
        });
        return msg.content[0].text || "No response from API.";
    } catch (error) {
        console.error("Error in getTripsFromClaude:", error);
        throw new Error("Failed to fetch trips from Claude.");
    }
}
