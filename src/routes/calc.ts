import { Router } from "express";
import { registerNewCalc, getCalc } from "../controllers/calc.js";
import type { calcInput } from "../types/types.js";

const router = Router();

router.post("/calculation", async(req, res) =>{
    const val1: number = req.body.val1;
    const val2: number = req.body.val2;
    const operator: string = req.body.operator;
    const answer: number = req.body.answer;
    if (val1 !== undefined && val2 !== undefined && operator !== undefined && answer !== undefined){
        const calcInfo: calcInput = { val1, val2, operator, answer };
        const insert = await registerNewCalc(calcInfo);
    
    if (insert){
        res.json({ success: true });
    }else{
        res.status(500).send(`internal server error(post)`);
    }
    } else{
        res.status(400).send(`need to provide all info for post`)
    }
});

router.get("/getdata", async (req,res) => {
    try{
        const data = await getCalc();
        res.json({ success:true, data});
    }catch(err) {
        console.error("GET ROUTE ERROR: ", err);
        res.status(500).json({ success: false })
    }
});

export default router;