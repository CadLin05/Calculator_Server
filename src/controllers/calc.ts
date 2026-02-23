import pool from "./utils/database.js";
import type { calculation, calcInput } from "../types/types.js";
import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { error } from "node:console";

export const registerNewCalc = async (calcInfo: calcInput) => {
    //making sure it updates if there is a calculation already 
    const query = "SELECT * FROM calculation"
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    if (rows.length === 0){
        const data = await pool.execute<ResultSetHeader>(
        `INSERT INTO calculation(val1,val2,operator) VALUES(?,?,?)`,
        [calcInfo.val1, calcInfo.val2, calcInfo.operator],
    );

    if(data[0].affectedRows > 0){
        console.log("rows changed");
        return true;
    }

    return false

    }else{
        const data = await pool.execute<ResultSetHeader>(
        `UPDATE calculation(val1,val2,operator) VALUES(?,?,?) WHERE id = 1`,
        [calcInfo.val1, calcInfo.val2, calcInfo.operator],
        );
        if(data[0].affectedRows > 0){
        console.log("calculation updated");
        return true;
    }
    }
    
}

export const getCalc = async() =>{
    const query = `SELECT * FROM calculation`;
    const data = await pool.execute(query);
    if(data){
        return data;
    }
    else{
        
        console.log("no data returned for the getCalc func:", error);
    }
}