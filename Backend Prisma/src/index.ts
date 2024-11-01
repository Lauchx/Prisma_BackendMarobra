import express, { Request, Response } from 'express';
import cors from 'cors';
import { DELETEPROD, GETPROD, POSTPROD } from './routes/products/+server';
import { GETSTOCK, POSTSTOCK } from './routes/stock/+server';
//const crypto = require('node:crypto')
const app = express();
app.disable('x-powered-by')
const PORT = process.env.PORT ?? 3000;

app.use(cors())
app.use(express.json())

//const { validateProduct } = require('./schemas/products_schema');

// Endpoint para obtener los datos

app.get('/products', async (_request, response) => {
    try {
        const products = await GETPROD()
        response.status(200).json(products)
    } catch (error) {
        console.error(error)
    }
});
app.get('/stock', async (_request, response) => {
    try {
        const newStock = await GETSTOCK()
        response.status(newStock.status).json(newStock.stock)
    } catch (error) {
        console.error(error)
    }
});

// Endpoint para crear un nuevo producto
// app.post('/products', async (request: Request, response: Response) => {
//     try {
//         const result = await POST(request)
//          response.status(201).json(result);
//     } catch (error) {
//         console.log(error)
//         return response.status(500).json({ error: 'Failed to create product' });
//     }
// })
app.post('/products', (request: Request, response: Response) => {
    POSTPROD(request)
        .then(result => response.status(result.status).json(result.product || result.error))
        .catch(error => {
            console.error('Error al crear el producto:', error);
            response.status(500).json({ error: 'Failed to create product' });
        });
});
app.post('/stock', (request: Request, response: Response) => {
    POSTSTOCK(request)
        .then(result => response.status(result.status).json(result.newStock))
        .catch(error => {
            console.error('Error al crear el producto:', error);
            response.status(500).json({ error: 'Failed to create product' });
        });
});
app.delete('/products/:id', (request: Request, response: Response) => {
    DELETEPROD(request).then(result => response.status(200).json(result)).catch(error => {
        console.error('Error al crear el producto:', error);
        response.status(500).json({ error: 'Failed to create product' });
    });

})

// // Endpoint para agregar un nuevo dato
// app.post('/products', (req: Request, res: Response) => {
//     const result = validateProduct(req.body)

//     if (!result.success) {
//        // return res.status(422).json({ error: result.error.issues })
//         return result.json({status: 422})
//     }
//     const newProduct = await prisma.product.create({       
//        data: {
//         // ...result.data,
//         name: result.name,
//         price: result.price,
//        }
//     })
//     console.log(newProduct)
//     return result.json({status: 210})
// });


// app.put('/products/:id', (req, res) => {
//     const { id } = req.params;
//     const result = validateProduct(req.body)

//     if (!result.success) {
//         return res.status(422).json({ error: result.error.issues })
//     }
//     const productIndex = dataProducts.findIndex(p => p.id === id)

//     if (productIndex === -1) {
//         return res.status(404).send('Item not found');
//     }
//     const updatedProduct = {
//         ...dataProducts[productIndex],
//         ...result.data,
//     }
//     dataProducts[productIndex] = updatedProduct;

//     res.status(200).json(updatedProduct);
// });

// // Endpoint para eliminar un dato
// app.delete('/products/:id', (req, res) => {
//     //const id = parseInt(req.params.id);
//     const id = req.params.id;
//     console.log(id + "ID")

//     const productIndex = dataProducts.findIndex(p => p.id === id)

//     if (productIndex === -1) {
//         return res.status(404).send('Item not found');
//     }
//     dataProducts.splice(productIndex, 1)
//     return res.json({ message: "Product deleted" })

// });

// //seleccionar por id
// app.get('/products/:id', (req, res) => {
//     const { id } = req.params;
//     const product = dataProducts.find(product => product.id === id);

//     if (product) {
//         return res.json(product);
//     }
//     return res.status(404).json({ error: 'Item not found' });

// });

// /**
//  * start with month method
//  */
// app.get('/month/:month', (req, res) => {
//     const { month } = req.params;
//     if (month >= 1 && month <= 12) {
//         fs.writeFileSync(`./json/month/${month}.json`, JSON.stringify(dataMonth, null, 2));
//         res.json(dataMonth);
//     }
//     else{
//         res.status(400).json({message: 'Mes invalido'})
//     }
// });

// app.post('/month', (req, res) => {
//     const result = validateProduct(req.body)
//     //const {month} = req.params
//     if (!result.success) {
//         return res.status(422).json({ error: result.error.issues })
//     }
//     const newProduct = {
//         id: crypto.randomUUID(),
//         ...result.data,
//         createAt: new Date,
//     }

//     dataMonth.push(newProduct);
//     res.status(201).json(dataMonth);
// });

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`API listening at http://localhost:${PORT}`);
});


