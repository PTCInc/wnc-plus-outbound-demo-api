/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        listByIdMaterial.sql
 * Description: This SQL script checks whether a record exists in the materialTable table
 * with a specific materialNumber, returning a boolean value (true or false) as exists.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

SELECT EXISTS (
    SELECT 1 
    FROM materialTable 
    WHERE materialNumber = $1
) as exists;