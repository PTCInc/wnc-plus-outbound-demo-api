/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        listMaterial.sql
 * Description: This SQL script retrieves all records from the materialTable table.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

SELECT 
    materialNumber,
    materialName,
    materialDescription,
    materialStartDate,
    materialPrice
FROM 
    materialTable;
