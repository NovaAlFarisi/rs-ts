interface Config {
    API_URL: string
}

export default {
    API_URL: process.env.API_URL || '' 
} as Config