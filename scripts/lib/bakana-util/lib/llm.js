async function _prompt(prompt, input) { 
    try {
        // Step 1: Parse the Multiattack description to extract potential attacks
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${macroUtil.llm.key}`, // Replace with your actual API key
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ 
                    role: "system",
                    content: prompt
                    }, {
                    role: "user",
                    content: input
                    }],
                max_tokens: 1000,
                temperature: 0,
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error parsing description:", error);
        return [];
    }
}

async function prompt(prompt, input) {
    let data = await _prompt(prompt, input);
    if (!data.choices || !data.choices[0]) throw("Invalid response from OpenAI API:", data);
  
    const parsed = JSON.parse(data.choices[0].message.content.trim());
    return parsed;
}

export const llmApi = { 
    prompt,
};
