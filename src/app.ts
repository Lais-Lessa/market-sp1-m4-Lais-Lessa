import express from 'express'
import { addProducts, deleteProducts, listProducts, listProductsById, updateProducts } from './logic'
import { checkProduct, checkProductName } from './middlewares'

const app = express()

app.use(express.json())

const PORT = 3000


app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get("/products", listProducts)

app.post("/products",checkProductName, addProducts)

app.get("/products/:id", checkProduct, listProductsById)

app.patch("/products/:id",checkProduct, checkProductName, updateProducts)

app.delete("/products/:id", checkProduct, deleteProducts)
