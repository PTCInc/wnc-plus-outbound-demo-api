/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        getMaterialStream.sql
 * Description: This SQL script retrieves data from the storage table, specifically the city
 * and quantity columns, ordered by the id column in ascending order, limited by a specified
 * number of rows ($1), and offset by a specified number of rows ($2).
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

SELECT 
    city, 
    quantity 
FROM 
    storage 
ORDER BY id 
LIMIT $1 OFFSET $2;