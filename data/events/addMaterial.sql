/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        addMaterial.sql
 * Description: This SQL script inserts a new record into the materialTable table with
 * specified values for materialNumber, materialName, materialDescription, materialStartDate,
 * and materialPrice, returning the materialNumber of the inserted record.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

INSERT INTO materialTable
(
    materialNumber,
    materialName,
    materialDescription,
    materialStartDate,
    materialPrice
)
VALUES
(
    $1,
    $2,
    $3,
    $4,
    $5
)

RETURNING materialNumber AS materialNumber;