/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        config.js
 * Description: This file contains configuration settings for the application. It utilizes the
 * 'dotenv' module to load environment variables from a '.env' file and 'assert' module for 
 * ensuring that required environment variables are defined.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

const dotenv = require('dotenv');
const assert = require('assert');

// Load environment variables from the '.env' file
dotenv.config();

// Destructure required environment variables
const {PORT, HOST, HOST_URL, USER, PASSWORD, DATABASE, SERVER, DBPORT} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, "HOST is required");

// Export configuration settings of express server and PostgreSQL database
module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    // PostgreSQL database connection parameters
    postgreSql:{
        user: USER,
        password: PASSWORD,
        host: SERVER,
        port: DBPORT,
        database: DATABASE
    }
}