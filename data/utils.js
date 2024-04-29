/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        utils.js
 * Description: This file contains a utility function for loading SQL queries from files in a 
 * specified folder. It utilizes the 'fs-extra' module for file system operations and the 'path' 
 * module for working with file paths.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

const fs = require('fs-extra');
const {join} = require('path');

// Utility function to load SQL queries from files
const loadSqlQueries = async (folderName) => {
    // Construct the file path
    const filePath = join(process.cwd(), 'data', folderName);
    // Read the list of files in the folder
    const files = await fs.readdir(filePath);
    // Filter out SQL files
    const sqlFiles = await files.filter(f => f.endsWith('.sql'));
    const queries = {};
    // Read each SQL file and store queries in an object
    for(const sqlFile of sqlFiles){
        const query = await fs.readFileSync(join(filePath,sqlFile), {encoding: "utf-8"});
        queries[sqlFile.replace(".sql", "")] = query;
    }
    // Return the object containing loaded SQL queries
    return queries;
}

// Export the utility function
module.exports = {
    loadSqlQueries
}