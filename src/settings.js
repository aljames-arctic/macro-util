/* Initialize Module Settings */
Hooks.once('init', function() {
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
            console.log(`Switched to ${value}`)
            const gemini = game.settings.settings.get(`macro-util.geminiApiKey`);
            const openai = game.settings.settings.get(`macro-util.openaiApiKey`);
            const active = game.settings.settings.get(`macro-util.${value}ApiKey`);

            gemini.config = false;
            openai.config = false;
            active.config = true;
        },
    });

    game.settings.register('macro-util', 'geminiApiKey', {
        name: 'Gemini API Key',
        hint: 'Enter your API key for Gemini.',
        scope: 'world',
        config: (game.settings.get('macro-util', 'llmProvider') == 'gemini'),
        type: String,
        default: '',
        restricted: true,
        onChange: (value) => {
            console.log('Gemini API Key changed:', value ? 'Set' : 'Unset');
        },
    });

    game.settings.register('macro-util', 'openaiApiKey', {
        name: 'OpenAI API Key',
        hint: 'Enter your API key for OpenAI.',
        scope: 'world',
        config: (game.settings.get('macro-util', 'llmProvider') == 'openai'),
        type: String,
        default: '',
        restricted: true,
        onChange: (value) => {
            console.log('OpenAI API Key changed:', value ? 'Set' : 'Unset');
        },
    });
});