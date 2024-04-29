/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        eventRoutes.js
 * Description: This file defines the routes for handling events related to materials using 
 * Express Router. It imports the necessary controller functions from '../controllers/eventController' 
 * and maps them to corresponding HTTP methods and URL endpoints.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

// Destructure controller functions from eventController
const {listByIdMaterial, listMaterial, addMaterial, updateMaterial, deleteMaterial, deleteAllMaterial, getMaterialNumber, getMaterialStream} = eventController;

//Retrives a unique material number.
router.get('/material', getMaterialNumber);
//Checks if material is present. 
router.get('/material/:id', listByIdMaterial);
//Adds a new material
router.put('/material', addMaterial);
//Updates material details by ID.
router.patch('/material/:id', updateMaterial);
//Retrives all materials.
router.get('/materials', listMaterial);
//Deletes a material by ID.
router.delete('/material/:id', deleteMaterial);
//Deletes all materials.
router.delete('/materials', deleteAllMaterial);
//Retrieves material stream data by ID.
router.get('/materialData/stream/:id', getMaterialStream);

// Export the configured routes
module.exports = {
    routes: router
}