/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        deleteMaterial.sql
 * Description: This SQL script deletes a record from the materialTable table with
 * specified value for materialNumber.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

DELETE FROM materialTable
WHERE materialNumber=$1