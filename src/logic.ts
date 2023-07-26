import { Request, Response } from "express";
import market from "./database";
import Product from "./interfaces";

export const listProducts = (req: Request, res: Response) => {
    const { section } = req.query

    if(section) { 
        const filteredProducts = market.filter((product) => product.section === section)
        const total = filteredProducts.reduce((sum, product) => sum + product.price, 0) 
        return res.json ({ 
            total, 
            products: filteredProducts
        })

    } else { 
        const total = market.reduce((sum, product) => sum + product.price, 0) 
        return res.json({ total, products: market})
    }
}


const incrementId = () =>{
    const ItemId = market.reduce((maxId, item) => Math.max(maxId, item.id), 0) 
    return ItemId + 1
}

export const addProducts = (req: Request, res: Response) => {
    
    const { name, price, weight, section, calories } = req.body
    
    const existingProduct = market.find((p) => p.name === name)

    
    if(existingProduct){
        return res.status(409).json({message: "Product already registered."})
    }

   
    const id = incrementId();

    const expirationDate = new Date();
    
    expirationDate.setDate(expirationDate.getDate() + 365)

    const product: Product = {
        id,
        name,
        price,
        weight, 
        section, 
        calories,
        expirationDate
    }

    market.push(product)
    return res.status(201).json(product)

}

export const listProductsById = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = market.find((product) => product.id === id)

    if(product) {
        return res.json(product)
    } else {
        return res.status(404).json({ message: "Product not found."})
    }
}

export const updateProducts = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = market.findIndex((product) => product.id === id)

    if(product === -1) { 
        return res.status(404).json({ message: "Products not found."})
    }

    const updateProduct = { ...market[product], ...req.body}  
    market[product] = updateProduct 

    return res.json(updateProduct)
}

export const deleteProducts = (req: Request, res: Response) => {

    const id = Number(req.params.id)
    const productIndex = market.findIndex((product) => product.id === id) 

    if(productIndex === -1){
        return res.status(404).json({ message: "Product not found."})
    }
    
    market.splice(productIndex, 1) 

    return res.status(204).end()
}
