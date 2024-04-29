/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        updateMaterial.sql
 * Description: This SQL script updates the materialTable by setting the materialName,
 * materialDescription, materialStartDate, and materialPrice columns to specified values,
 * based on the materialNumber provided as $1.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

UPDATE materialTable
SET 
    materialName = $2,
    materialDescription = $3,
    materialStartDate = $4,
    materialPrice = $5
WHERE 
    materialNumber = $1;