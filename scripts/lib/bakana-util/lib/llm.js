async function _prompt(prompt, input) { 
    // Step 1: Parse the Multiattack description to extract potential attacks
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${macroUtil.llm.key}`, 
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: input }
            ],
            max_tokens: 1000,
            temperature: 0,
        }),
    });

    return response.json();
}

async function prompt(prompt, input) {
    if (!macroUtil.llm.key) {
        ui.notifications.error('LLM Key not set! You need to run macroUtil.llm.key = "sk-proj-abcde12345" (but with an actual key)');
        return;
    }
    let data = await _prompt(prompt, input);
    if (!data.choices || !data.choices[0]) throw("Invalid response from OpenAI API:", data);
  
    return JSON.parse(data.choices[0].message.content.trim());
}

export const llmApi = { 
    prompt,
};
