import {multiattack} from '../constants/llm-multiattack.js';

import { openai } from './llm-models/openai.js';
import { gemini } from './llm-models/gemini.js';



/**
 * Sends a prompt to the OpenAI API and parses the response.
 * @param {string} prompt The system prompt.
 * @param {string} input The user prompt.
 * @returns {Promise<object>} The parsed response from the API.
 */
async function prompt(prompt, input) {
    const provider = game.settings.get('macro-util', 'llmProvider');
    switch (provider){
        case 'openai': return openai.prompt(prompt, input);
        case 'gemini': return gemini.prompt(prompt, input);
        default: throw('Unknown LLM provider');
    }
}

export const llmApi = {
    constant : {multiattack},
    prompt,
    openai,
    gemini,
};
