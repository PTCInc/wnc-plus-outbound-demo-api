/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        index.js
 * Description: This file contains functions related to material data management. It interacts 
 * with the PostgreSQL database to retrieve material information and generate material numbers.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

const utils = require('../utils');
const config = require('../../config');
const {Pool} = require('pg');

// Function to generate a unique material number
const getMaterialNumber = async() => {
    try {
        const prefix = 'GLE';
        const suffix = '-IN';
        let generatedNumber;
        // Generate a unique material number that does not exist in database
        do {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            generatedNumber = prefix+h+m+s+suffix;
        } while (await listByIdMaterial(generatedNumber));
        // Return the generated number
        return generatedNumber;
    } catch (error) {
        console.error(error.message);
    }
}

// Function to retrieve material stream data from the database
const getMaterialStream = async(materialNumber,limit, offset) => {
    try {
        // Check if the material exists in the database
        if(await listByIdMaterial(materialNumber)){
            // Create a new database connection pool
            const db = new Pool(config.postgreSql);
            // Load SQL queries from external files
            const sqlQueries = await utils.loadSqlQueries('events');
            // Execute the query to retrieve material stream data
            const list = await db.query(sqlQueries.getMaterialStream, [limit,offset]);
            // Return the retrieved data
            return list.rows;
        }else{
            // Return error message if the material is not present in the database
            return "Material not present in DB";
        }
    } catch (error) {
        console.error("Error fetching material data stream: ",error.message);
    }
}

// Function to retrieve all materials from the database
const listMaterial = async () => {
    try{
        const db = new Pool(config.postgreSql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const list = await db.query(sqlQueries.listMaterial);
        return list.rows;
    }catch(error) {
        console.error("Error fetching materials:", error);
        error.message;
    }
}

// Function to check if material is present in database
const listByIdMaterial = async (materialNumber) => {
    try{
        const db = new Pool(config.postgreSql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const list = await db.query(sqlQueries.listByIdMaterial, [materialNumber]);
        return list.rows[0].exists;
    }catch(error) {
        console.error("Error fetching materials:", error);
        error.message;
    }
}

// Function to add a new material in database
const addMaterial = async (materialData) => {
    try{
        const db = new Pool(config.postgreSql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertMaterial = await db.query(sqlQueries.addMaterial, 
                                            [materialData.materialNumber,
                                            materialData.materialName, 
                                            materialData.materialDescription, 
                                            materialData.materialStartDate, 
                                            materialData.materialPrice]);
        return insertMaterial.rows;
    }catch(error){
        console.error("Error adding materials:", error);
        return error.message;
    }
}

// Function to update a material details in database
const updateMaterial = async (materialNumber, materialData) => {
    try {
        if(await listByIdMaterial(materialNumber)){
            const db = new Pool(config.postgreSql);
            const sqlQueries = await utils.loadSqlQueries('events');
            const update = await db.query(sqlQueries.updateMaterial,
                                        [materialNumber,
                                        materialData.materialName, 
                                        materialData.materialDescription, 
                                        materialData.materialStartDate, 
                                        materialData.materialPrice]);
            return "Material Updated";
        }else{
            return "Material not present in DB";
        }
    } catch (error) {
        return error.message;
    }
}

// Function to delete a material from database
const deleteMaterial = async(materialNumber) => {
    try {
        if(await listByIdMaterial(materialNumber)){
            const db = new Pool(config.postgreSql);
            const sqlQueries = await utils.loadSqlQueries('events');
            const deleted = await db.query(sqlQueries.deleteMaterial, [materialNumber]);
            return "Material Deleted";
        }else{
            return "Material not present in DB";
        }
    } catch (error) {
        return error.message;
    }
}

// Function to delete all materials from database
const deleteAllMaterial = async() => {
    try{
        const db = new Pool(config.postgreSql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const deleteall = await db.query(sqlQueries.deleteAllMaterial);
        return deleteall.rows;
    }catch(error){
        return error.message;
    }
}

// Export functions
module.exports = {
    listMaterial,
    listByIdMaterial,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    deleteAllMaterial,
    getMaterialNumber,
    getMaterialStream
}