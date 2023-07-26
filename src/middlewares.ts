import { NextFunction, Request, Response } from "express"
import market from "./database"

export const checkProduct = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id) 

    const productExist = market.find((product) => product.id === id)

    if(!productExist){
        return res.status(404).json({message: "Product not found."})
    }

    next() 
}

export const checkProductName = (req: Request, res: Response, next: NextFunction ) => {
    const { name } = req.body
    const productExist = market.find((product) => product.name === name)

    if(productExist) {
        return res.status(409).json({ message: "Product already registered."})
    }

    next()
}   
