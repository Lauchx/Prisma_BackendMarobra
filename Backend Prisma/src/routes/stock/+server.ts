import { prisma } from "../../database/client";
import { Request } from 'express';
const {validateStock} = require('../../schemas/products_schema')

export async function GETSTOCK() {
    try {
        const stock = await prisma.stock.findMany()
        
        return {stock, status: 200}
    } catch (error) {
        return {error,  status: 500}

    }

}
export async function POSTSTOCK(request: Request) {
    try {
        let { outbound, inbound, current_quantity } = await request.body

        // outbound = outbound ? outbound : 0
        // inbound  = inbound ? inbound : 0
        // current_quantity =  current_quantity ? current_quantity : 0
        // hacer verificaciones  de datos
        const result = validateStock(request.body)

        if (!result.success) {
            return {error:'Bad request', status: 422 }
        }
        const newStock = await prisma.stock.create({ data: { outbound, inbound, current_quantity } })

        return {newStock, status:201}
    } catch (error) {
        console.error('Error creating product:', error);
        return { error: 'Failed to create product', status: 500 };

    }
}
