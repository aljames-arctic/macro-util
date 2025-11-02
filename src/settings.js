/* Initialize Module Settings */
Hooks.once('init', function() {
    game.settings.register('macro-util', 'useGlobalApiKey', {
        name: 'Enable global API key usage',
        hint: 'If enabled, all users will use the same API key set by the GM.\nNote: All GMs will be able to see this key\nNote: If you make it a global key, snoopy users will be able to access it (locally their code needs to know what it is).\n\n!!! After setting this and the LLM Provider, SAVE AND REOPEN to continue (the API field will change) !!!',
        scope: 'world',
        config: true,
        type: Boolean,
        default: false, // Default to global usage
        restricted: true,
    });

    game.settings.register('macro-util', 'llmProvider', {
        name: 'LLM Provider',
        hint: 'Choose the Large Language Model (LLM) provider to use for AI-powered features.\n\n!!! After setting this and the Global preference, SAVE AND REOPEN to continue (the API field will change) !!!',
        scope: 'world',
        config: true,
        type: String,
        choices: {
            'gemini': 'Gemini',
            'openai': 'OpenAI',
        },
        default: 'gemini',
        onChange: (value) => {
            console.log(`Switched to ${value}`);
        },
    }),

    // Global API Key settings (only visible if useGlobalApiKey is true)
    game.settings.register('macro-util', 'geminiApiKeyGlobal', {
        name: 'Global Gemini API Key',
        hint: 'Enter the server side API key for Gemini. (https://aistudio.google.com/api-keys)',
        scope: 'world',
        config: true,
        type: String,
        default: '',
        restricted: true,
        onChange: (value) => {
            console.log('Global Gemini API Key changed:', value ? 'Set' : 'Unset');
        },
    });

    game.settings.register('macro-util', 'openaiApiKeyGlobal', {
        name: 'Global OpenAI API Key',
        hint: 'Enter the server side API key for OpenAI.',
        scope: 'world',
        config: true,
        type: String,
        default: '',
        restricted: true,
        onChange: (value) => {
            console.log('Global OpenAI API Key changed:', value ? 'Set' : 'Unset');
        },
    });

    game.settings.register('macro-util', 'geminiApiKey', {
        name: 'Gemini API Key',
        hint: 'Enter your client side API key for Gemini. (https://aistudio.google.com/api-keys)',
        scope: 'client',
        config: true,
        type: String,
        default: '',
        onChange: (value) => {
            console.log('Gemini API Key changed:', value ? 'Set' : 'Unset');
        },
    });

    game.settings.register('macro-util', 'openaiApiKey', {
        name: 'OpenAI API Key',
        hint: 'Enter your client side API key for OpenAI.',
        scope: 'client',
        config: true,
        type: String,
        default: '',
        onChange: (value) => {
            console.log('OpenAI API Key changed:', value ? 'Set' : 'Unset');
        },
    });
});