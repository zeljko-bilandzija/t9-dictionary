// If NODE_ENV is not specified, it is also development environment
const env = process.env.NODE_ENV || 'development';

// Look at all keys in json and making env properties
// so we can use it later
const config = require('./config.json');
const envConfig = config[env];
Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
});