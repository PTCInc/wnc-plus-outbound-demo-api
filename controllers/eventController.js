/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        eventController.js
 * Description: This file contains controller functions for handling events related to materials.
 * It interacts with the data layer, specifically the events module located in '../data/events/index.js',
 * to retrieve material information and stream data to clients.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

const eventData = require('../data/events/dataController');
const clientSessions = {};

// Controller function for streaming material data to clients
const getMaterialStream = async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Retrieve or create a session object for the client
    const sessionId = req.sessionId || (req.sessionId = generateSessionId());
    let session = clientSessions[sessionId];
    if(!session){
        session = clientSessions[sessionId] = {
            offset:0,
            materialNumber: req.params.id
        };
    }
    
    // Function to send material data to clients
    const sendMaterialData =async() =>{
        try {
            let materialData = await eventData.getMaterialStream(session.materialNumber, 25, session.offset);
            if(materialData){
                res.write(`data: ${JSON.stringify(materialData)}\n\n`);
                session.offset+=25;
            }else{
                clearInterval(intervalId);
                res.end();
            }
        } catch (error) {
            res.write("Error streaming material data");
            clearInterval(intervalId);
            res.end();
        }
    };    

    // Set interval to send material data periodically
    const intervalId = setInterval(sendMaterialData, 1000);
    req.on('close', () => {
        clearInterval(intervalId);
    });
};

// Function to generate session ID
function generateSessionId(){
    return Math.random();
}

// Controller function to retrieve a unique material number
const getMaterialNumber = async(req, res, next) => {
    try {
        const num = await eventData.getMaterialNumber();
        res.send(num);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Controller function to retrive all materials.
const listMaterial = async (req, res, next) => {
    try{
        const events = await eventData.listMaterial();
        res.send(events);
    }catch(error){
        res.status(400).send(error.message);
    }
}

// Controller function to check if material is present.
const listByIdMaterial = async(req, res, next) => {
    try{
        const materialNumber = req.params.id;
        const oneEvent = await eventData.listByIdMaterial(materialNumber);
        res.send(oneEvent);
    }catch(error){
        res.status(400).send(error.message);
    }
}

// Controller function to add a new material
const addMaterial = async(req, res, next) => {
    try{
        const data = req.body;
        const created = await eventData.addMaterial(data);
        res.send(created);
    }catch(error){
        res.status(400).send(error.message);
    }
}

// Controller function to update material details
const updateMaterial = async(req, res, next) => {
    try {
        const materialNumber = req.params.id;
        const data = req.body;
        const updated = await eventData.updateMaterial(materialNumber, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Controller function to delete a material
const deleteMaterial = async(req, res, next) => {
    try {
        const materialNumber = req.params.id;
        const deletedmat = await eventData.deleteMaterial(materialNumber);
        res.send(deletedmat);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Controller function to delete all materials
const deleteAllMaterial = async(req, res, next) => {
    try {
        const deleteall = await eventData.deleteAllMaterial();
        res.send("All Materials Deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Export controller functions
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