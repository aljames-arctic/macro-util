/*
You can get a Gemini API key from Google AI Studio. Here's how:
    1. Go to Google AI Studio (https://aistudio.google.com/api-keys).
    2. Sign in with your Google account.
    3. Click the "Get API key" button in the top left.
    4. Click "Create API key" button in the top right.

Copy your generated API key to the module settings.
*/

/**
 * Sends a prompt to the Gemini API.
 * @param {string} [prompt] The system prompt.
 * @param {string} input The user prompt.
 * @returns {Promise<object>} The response from the API.
 * @private
 */
async function _prompt(prompt, input, key) {
    const requestBody = {
        contents: [
            {
                parts: [
                    { text: input }
                ]
            }
        ],
        generationConfig: {
            temperature: 0,
            maxOutputTokens: 1000,
        }
    };

    if (prompt) {
        requestBody.systemInstruction = {
            parts: [
                { text: prompt }
            ]
        };
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": key,
        },
        body: JSON.stringify(requestBody),
    });

    return response.json();
}

/**
 * Sends a prompt to the Gemini API and parses the response.
 * @param {string} prompt The system prompt or user prompt if input is not provided.
 * @param {string} [input] The user prompt.
 * @returns {Promise<object>} The parsed response from the API.
 */
async function prompt(prompt, input, apiKey) {
    let systemPrompt = prompt;
    let userInput = input;
    if (input === undefined) {
        systemPrompt = undefined;
        userInput = prompt;
    }

    if (!apiKey) {
        const global = game.settings.get('macro-util', 'useGlobalApiKey');
        apiKey = game.settings.get('macro-util', `geminiApiKey${(global) ? "Global" : ""}`);
    }

    let data = await _prompt(systemPrompt, userInput, apiKey);
    if (!data.candidates || !data.candidates[0]?.content?.parts || !data.candidates[0].content.parts[0]) {
        console.error("Invalid or incomplete response from Gemini API:", data);
        throw new Error("Invalid or incomplete response from Gemini API");
    }
    return data.candidates[0].content.parts[0].text.trim();
}

async function listModels() {
    const useGlobalApiKey = game.settings.get('macro-util', 'useGlobalApiKey');
    let apiKey;
    if (useGlobalApiKey) {
        apiKey = game.settings.get('macro-util', 'geminiApiKeyGlobal');
    } else {
        apiKey = game.settings.get('macro-util', 'geminiApiKey');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
        },
    });

    return response.json();
}

export const gemini = {
    prompt,
    listModels,
};
