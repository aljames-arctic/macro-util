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
    });

    game.settings.register('macro-util', 'llmApiKey', {
        name: 'LLM API Key',
        hint: 'Enter your API key for the selected LLM provider.',
        scope: 'world',
        config: true,
        type: String,
        default: '',
        restricted: true,
        // This makes the input a password field
        onChange: (value) => {
            // You might want to add some validation or encryption here
            console.log('LLM API Key changed:', value ? 'Set' : 'Unset');
        },
    });
});