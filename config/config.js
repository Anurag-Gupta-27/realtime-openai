const config = {
    openAIKeys: {
        voice1: process.env.OPENAI_KEY_1,
        voice2: process.env.OPENAI_KEY_2,
        voice3: process.env.OPENAI_KEY_3
    },
    routes: {
        home: '/',
        terms: '/terms',
        privacy: '/privacy',
        // Add more configurable routes here
    }
}

export default config;