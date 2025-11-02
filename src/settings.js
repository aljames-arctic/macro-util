/* Initialize Module Settings */
Hooks.once('init', function() {
    game.settings.register('macro-util', 'useGlobalApiKey', {
        name: 'Enable global API key usage',
        hint: 'If enabled, all users will use the same API key set by the GM. Otherwise, users can set their own distinct keys.',
        scope: 'world',
        config: true,
        type: Boolean,
        default: false, // Default to global usage
        restricted: true,
    });

    game.settings.register('macro-util', 'llmProvider', {
        name: 'LLM Provider',
        hint: 'Choose the Large Language Model (LLM) provider to use for AI-powered features.',
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
        hint: 'Enter the global API key for Gemini. (https://aistudio.google.com/api-keys)',
        scope: 'world',
        config: (game.settings.get('macro-util', 'useGlobalApiKey') && game.settings.get('macro-util', 'llmProvider') == 'gemini'),
        type: String,
        default: '',
        restricted: true,
        onChange: (value) => {
            console.log('Global Gemini API Key changed:', value ? 'Set' : 'Unset');
        },
    });

    game.settings.register('macro-util', 'openaiApiKeyGlobal', {
        name: 'Global OpenAI API Key',
        hint: 'Enter the global API key for OpenAI.',
        scope: 'world',
        config: (game.settings.get('macro-util', 'useGlobalApiKey') && game.settings.get('macro-util', 'llmProvider') == 'openai'),
        type: String,
        default: '',
        restricted: true,
        onChange: (value) => {
            console.log('Global OpenAI API Key changed:', value ? 'Set' : 'Unset');
        },
    });

    game.settings.register('macro-util', 'geminiApiKey', {
        name: 'Gemini API Key',
        hint: 'Enter your personal API key for Gemini. (https://aistudio.google.com/api-keys)',
        scope: 'client',
        config: (!game.settings.get('macro-util', 'useGlobalApiKey') && game.settings.get('macro-util', 'llmProvider') == 'gemini'),
        type: String,
        default: '',
        onChange: (value) => {
            console.log('Gemini API Key changed:', value ? 'Set' : 'Unset');
        },
    });

    game.settings.register('macro-util', 'openaiApiKey', {
        name: 'OpenAI API Key',
        hint: 'Enter your personal API key for OpenAI.',
        scope: 'client',
        config: (!game.settings.get('macro-util', 'useGlobalApiKey') && game.settings.get('macro-util', 'llmProvider') == 'openai'),
        type: String,
        default: '',
        onChange: (value) => {
            console.log('OpenAI API Key changed:', value ? 'Set' : 'Unset');
        },
    });
});