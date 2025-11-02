/**
 * Sends a prompt to the OpenAI API.
 * @param {string} prompt The system prompt.
 * @param {string} input The user prompt.
 * @returns {Promise<object>} The response from the API.
 * @private
 */
async function _prompt(prompt, input, key) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`, 
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

/**
 * Sends a prompt to the OpenAI API and parses the response.
 * @param {string} prompt The system prompt.
 * @param {string} input The user prompt.
 * @returns {Promise<object>} The parsed response from the API.
 */
async function prompt(prompt, input, apiKey) {
    if (!apiKey) {
        const global = game.settings.get('macro-util', 'useGlobalApiKey');
        apiKey = game.settings.get('macro-util', `openaiApiKey${(global) ? "Global" : ""}`);
    }

    let data = await _prompt(prompt, input, apiKey);
    if (!data.choices || !data.choices[0]) throw("Invalid response from OpenAI API:", data);
    return data.choices[0].message.content.trim();
}

export const openai = {
    prompt,
};
