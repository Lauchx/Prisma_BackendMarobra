import { prisma } from "../../database/client";
import { Request } from 'express';
import { postStock, putStock } from "../stock/+server";
const { validateProduct, validateProduct_InPut } = require('../../schemas/products_schema');
export async function getProducts() {
    try {
        // Obtener los productos de la base de datos
        const products = await prisma.product.findMany({ include: { stock: true } }); // Asegúrate de usar await

        if (products.length <= 0) return { status: 404, body: { message: "No hay productos" } };

        // Devolver los productos en formato JSON
        return { products, status: 200 }
    } catch (error) {
        console.error('Error fetching products:', error);
        return { error: 'Failed to fetch products', status: 500 };
    }
}
export async function getById_Products(request: Request) {
    try {
        // Obtener los productos de la base de datos
        const { id } = request.params
        const product = await prisma.product.findFirst({ where: { id: Number(id) }, include: { stock: true } }); // Asegúrate de usar await
        if (!product) return { status: 404, body: { message: "No hay productos" } };
        // Devolver los productos en formato JSON
        return { product, status: 200 }
    } catch (error) {
        console.error('Error fetching products:', error);
        return { error: 'Failed to fetch products', status: 500 };
    }
}
export async function postProducts(request: Request) {
    try {
        const result = validateProduct(request.body)
        if (!result.success) {
            return { error: result, status: 422 }
        }

        const { name, width, height, length } = await request.body
        const stockResponse = await postStock(request)

        if (stockResponse.error || !stockResponse.newStock) {
            // Si hay un error al crear el Stock, devolver el error y el estado
            return { error: stockResponse.error, status: stockResponse.status };
        }
        const product = await prisma.product.create({ data: { name, width, height, length, id_Stock: stockResponse.newStock.id } })
        // da un problema con la foreign key. Hay que hacer el metoo post para el Stock.
        // de esta forma puedo crear el objeto products con todas sus variables?
        return { product, status: 201 }


    } catch (error) {
        console.error('Error creating product:', error);
        return { error: error, status: 500 };

    }
}
export async function deleteProduct(request: Request) {
    try {
        const id = Number(request.params.id)
        const deleted = await prisma.product.delete({ where: { id: id } })

        console.log(deleted)
        return { body: "Products wad  deleted", status: 200 }

    } catch (error) {
        console.error('Error deleting product:', error);
        return { error: 'Failed to delete product', status: 500 };
    }
}
export async function putProducts(request: Request) {
    let { id } = request.params;
    const result = validateProduct_InPut(request.body)
    if (!result.success) {
        return { error: result, status: 422 }
    }
    const modifyProduct = await prisma.product.update({ where: { id: Number(id) },
     data: {name:result.data.name, width: result.data.width, height: result.data.height, length: result.data.length} })
     // Llama al metodo para actualizar el stock.
     putStock(request,  modifyProduct.id_Stock)
    if (!modifyProduct) {
        return { error: 'Product not found', status: 404 }
    }

    return { message:'Product modify', status: 200 }
}