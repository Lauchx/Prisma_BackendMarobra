import { prisma } from "../../database/client";
import { Request } from 'express';
import { postStock } from "../stock/+server";


// export async function getHistorical(request: Request) {
//     try {
//         const historical = await prisma.historical.findMany()
//         if(historical.length <= 0) return { historical: "No hay productos", status: 403 };
//         return { historical: historical, status: 200 };
//     } catch (error) {
//         console.log(error)
//         return { error: error, status: 500 }
//     }

// }
export async function getHistorical(request: Request) {
    try {
        const { month } = await request.params

        const year = new Date().getFullYear();
        const startDate = new Date(year, parseInt(month) - 1, 1); 
        const endDate = new Date(year, parseInt(month), 0);
        console.log("start:", startDate, "end:", endDate )
        console.log(await prisma.historical.findMany())
        const historical = await prisma.productSold.findMany({where: { createdAt: {gte: startDate, lte:endDate} }})
        console.log(historical, "historical")
        if (historical.length <= 0) return { historical:`No hay productos en el mes ${month}`, status: 400 };
        return { historical: historical, status: 200 };
    } catch (error) {
        console.log(error)
        return { error: error, status: 500 }
    }

}


export async function postHistorical(request: Request) {
    try {
        //const result = validateProduct(request.body)
        // if (!result.success) {
        //     return { error: result, status: 422 }
        // }

        const { product_id, date } = await request.body
        const stockResponse = await postStock(request)

        if (stockResponse.error || !stockResponse.newStock) {
            // Si hay un error al crear el Stock, devolver el error y el estado
            return { error: stockResponse.error, status: stockResponse.status };
        }
        const historical = await prisma.historical.create({ data: { product_id, date, id_Stock: stockResponse.newStock.id } })
        // da un problema con la foreign key. Hay que hacer el metoo post para el Stock.
        // de esta forma puedo crear el objeto products con todas sus variables?
        return { historical: historical, status: 201 }

    } catch (error) {
        console.error('Error creating product:', error);
        return { error: error, status: 500 };
    }
}