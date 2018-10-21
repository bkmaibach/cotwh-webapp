/*
* Create and export configuration variables
*
*/

// Container for all of the environments
let environments = {};

// Default to development environment
environments.development = {
    'httpPort' : 3000,
    'httpsPort' : 3001,
    'envName' : 'development',
    'hashingSecret' : 'Howdily-Doodly!',
    'bot': {
        'prefix' : '!'
    },
    'discord' : {
        'clientSecret' : process.env.DISCORD_CLIENT_SECRET,
        'botToken' : process.env.DISCORD_BOT_TOKEN
    },
    'twilio' : {
        'accountSid' : process.env.TWILIO_ACCOUNT_SID,
        'authToken' : process.env.TWILIO_AUTH_TOKEN,
        'fromPhone' : process.env.TWILIO_FROM_PHONE
    },
    'mongo': {
        'uri': 'mongodb://localhost:27017/cotwh'
    },
    'stripe': {
        'apiKeyPublic': 'pk_test_9fW2iYhop6UsICWqfDMRDQA2',
        'apiKeySecret': process.env.STRIPE_API_KEY_SECRET,
    },
    'mailgun' : {
        'apiKey': process.env.MAILGUN_PRIVATE_API_KEY,
        'validationKey': process.env.MAILGUN_PUBLIC_VALIDATION_KEY,
    },
    'templateGlobals' : {
        'appName' : 'Church of the Well-Hatted (Under Development)',
        'companyName' : 'The Church of the Well-Hatted',
        'yearCreated' : '2018',
        'baseUrl' : 'https://localhost:3001'
    }
};

// Default to development environment
environments.testing = {
    'httpPort' : 3010,
    'httpsPort' : 3011,
    'envName' : 'testing',
    'hashingSecret' : 'Fiddly-Diddly-Doo!',
    'bot': {
        'prefix' : '!'
    },
    'discord' : {
        'clientSecret' : process.env.DISCORD_CLIENT_SECRET,
        'botToken' : process.env.DISCORD_BOT_TOKEN
    },
    'twilio' : {
        'accountSid' : process.env.TWILIO_ACCOUNT_SID,
        'authToken' : process.env.TWILIO_AUTH_TOKEN,
        'fromPhone' : process.env.TWILIO_FROM_PHONE
    },
    'mongo': {
        'uri': 'mongodb://localhost:27017/cotwh-test'
    },
    'stripe': {
        'apiKeyPublic': 'pk_test_9fW2iYhop6UsICWqfDMRDQA2',
        'apiKeySecret': process.env.STRIPE_API_KEY_SECRET,
    },
    'mailgun' : {
        'apiKey': process.env.MAILGUN_PRIVATE_API_KEY,
        'validationKey': process.env.MAILGUN_PUBLIC_VALIDATION_KEY,
    },
    'templateGlobals' : {
        'appName' : 'The Church of the Well-Hatted (Testing)',
        'companyName' : 'The Church of the Well-Hatted',
        'yearCreated' : '2018',
        'baseUrl' : 'https://localhost:3011'
    }
};

// Production object
environments.production = {
    'httpPort' : 80,
    'httpsPort' : 443,
    'envName' : 'production',
    'hashingSecret' : process.env.HASHING_SECRET,
    'bot': {
        'prefix' : '!'
    },
    'discord' : {
        'clientSecret' : process.env.DISCORD_CLIENT_SECRET,
        'botToken' : process.env.DISCORD_BOT_TOKEN
    },
    'twilio' : {
        'accountSid' : process.env.TWILIO_ACCOUNT_SID,
        'authToken' : process.env.TWILIO_AUTH_TOKEN,
        'fromPhone' : process.env.TWILIO_FROM_PHONE
    },
    'mongo': {
        'uri': `mongodb+srv://cardinal:${process.env.MONGO_PASS}@cluster0-evabu.mongodb.net/cotwh`
    },
    'stripe': {
        'apiKeyPublic': 'pk_live_Mk9bmJ1Up6HPaHqbVutzWnM2',
        'apiKeySecret': process.env.STRIPE_API_KEY_SECRET,
    },
    'mailgun' : {
        'apiKey': process.env.MAILGUN_PRIVATE_API_KEY,
        'validationKey': process.env.MAILGUN_PUBLIC_VALIDATION_KEY,
    },
    'templateGlobals' : {
        'appName' : 'The Church of the Well-Hatted',
        'companyName' : 'The Church of the Well-Hatted',
        'yearCreated' : '2018',
        'baseUrl' : 'https://hatis.life'
    }
};

// Determine which environemt was passed as a command-line arg
var selectedEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : 'development';

// Check that the currentEnv is valid
var envToExport = typeof(environments[selectedEnv]) == 'object' ? environments[selectedEnv] : environments.development;

module.exports = envToExport;