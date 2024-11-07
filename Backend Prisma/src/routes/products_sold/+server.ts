import { prisma } from "../../database/client";
import { Request } from 'express';
import { postStock } from "../stock/+server";
const { validateProductSold } = require('../../schemas/products_schema');

export async function getProductsSold() {
    try {
        const productSold = await prisma.productSold.findMany({ include: { stock: true, product: true } })
        return { productSold, status: 200 }
    } catch (error) {
        return { error, status: 500 }
    }
}
export async function getProductsSold_ById(request: Request) {
    try {
        // Obtener los productos de la base de datos
        const { id } = request.params
        const product = await prisma.productSold.findFirst({ where: { id: id }, include: { stock: true } });
        if (!product) return { error: "No se encontro el producto", status: 404 };
        // Devolver los productos en formato JSON
        return { product, status: 200 }
    } catch (error) {
        console.error('Error fetching products:', error);
        return { error: 'Failed to fetch products', status: 500 };
    }
}
export async function postProductSold(request: Request) {
    try {
        // validate products sold, if  not valid return error

        const result = validateProductSold(request.body)
        if (!result.success) return { error: result, status: 422 }

        const { product_id, createdAt } = await request.body  // cambiar a result.body
        const stockResponse = await postStock(request)
        if (stockResponse.error || !stockResponse.newStock) {
            // if exist error when create  stock return error
            return { error: stockResponse.error, status: stockResponse.status };
        }
        const productSold = await prisma.productSold.create({ data: { product_id, createdAt, id_stock: stockResponse.newStock.id } })
        return { productSold, status: 201 }
    } catch (error) {
        console.error('Error creating product:', error);
        return { error: error, status: 500 };

    }
}
// export async function putProductSold(request: Request) {
//     let { id } = request.params;
//     const result = validateProductSold(request.body)
//     if (!result.success) {
//         return { error: result, status: 422 }
//     }
//     const modifyProduct = await prisma.productSold.update({
//         where: { id: id },
//         data: { outbound: result.outbound,  }
//     })
//     Llama al metodo para actualizar el stock.
//     putStock(request, modifyProduct.id_Stock)
//     if (!modifyProduct) {
//         return { error: 'Product not found', status: 404 }
//     }

//     return { message: 'Product modify', status: 200 }
// }

