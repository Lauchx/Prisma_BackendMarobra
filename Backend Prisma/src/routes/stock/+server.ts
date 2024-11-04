import { prisma } from "../../database/client";
import { Request } from 'express';
const { validateStock } = require('../../schemas/products_schema')

export async function getStock() {
    try {
        const stock = await prisma.stock.findMany()

        return { stock, status: 200 }
    } catch (error) {
        return { error, status: 500 }

    }

}
export async function postStock(request: Request) {
    try {
        const req_stock = await request.body.stock
        console.log(req_stock)
        let { outbound, inbound, current_quantity } = req_stock

        // outbound = outbound ? outbound : 0
        // inbound  = inbound ? inbound : 0
        // current_quantity =  current_quantity ? current_quantity : 0
        // hacer verificaciones  de datos
        const result = validateStock(req_stock)

        if (!result.success) {
            return { error: 'Bad request', status: 422 }
        }
        inbound = result.data.inbound
        outbound = result.data.outbound

        const newStock = await prisma.stock.create({ data: { inbound, current_quantity, outbound } })

        return { newStock, status: 201 }
    } catch (error) {
        console.error('Error creating product:', error);
        return { error: 'Failed to create product', status: 500 };

    }
}
export async function putStock(request: Request, id: string) {
    try {
        const modStock = await prisma.stock.update({
            where: { id },
            data: { inbound: request.body.stock.inbound, outbound: request.body.stock.outbound, current_quantity: request.body.stock.current_quantity }
        });
        return { modStock, status: 200 }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to update product', status: 500 };

    }

}
