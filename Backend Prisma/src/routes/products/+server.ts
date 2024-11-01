import { prisma } from "../../database/client";
import { Request } from 'express';
const { validateProduct } = require('../../schemas/products_schema');
export async function GETPROD() {
    try {
        // Obtener los productos de la base de datos
        const products = await prisma.product.findMany(); // Asegúrate de usar await
        products.forEach(element => {
            console.log(element.id + "- " + element.name)
            console.log(typeof element.width)
        }) // Imprime los productos en la consola
        if (products.length <= 0) return { status: 404, body: { message: "No hay productos" } };


        // Devolver los productos en formato JSON
        return { products, status: 200 }
    } catch (error) {
        console.error('Error fetching products:', error);
        return { error: 'Failed to fetch products', status: 500 };
    }
}
export async function POSTPROD(request: Request) {
    try {
        const result = validateProduct(request.body)
        if (!result.success) {
            return { error: result, status: 422 }
        }

        console.log(typeof result.width)
        const { name, width, height, length, id_Stock } = await request.body


        const product = await prisma.product.create({ data: { name, width, height, length, id_Stock } })
        // da un problema con la foreign key. Hay que hacer el metoo post para el Stock.
        // de esta forma puedo crear el objeto products con todas sus variables

        return { product, status: 201 }


    } catch (error) {
        console.error('Error creating product:', error);
        return { error: error, status: 500 };

    }
}
export async function DELETEPROD(request: Request) {
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