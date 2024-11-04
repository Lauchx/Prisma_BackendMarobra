import express, { Request, Response } from 'express';
import cors from 'cors';
import { deleteProduct, getById_Products, getProducts, postProducts, putProducts } from './routes/products/+server';
import { getStock, postStock } from './routes/stock/+server';
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
        const products = await getProducts()
        response.status(200).json(products)
    } catch (error) {
        console.error(error)
    }
});

app.get('/products/:id', async (request, response) => {
    try {
        const products = await getById_Products(request)
        response.status(200).json(products)
    } catch (error) {
        console.error(error)
    }
})
app.get('/stock', async (_request, response) => {
    try {
        const newStock = await getStock()
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
    postProducts(request)
        .then(result => response.status(result.status).json(result.product || result.error))
        .catch(error => {
            console.error('Error al crear el producto:', error);
            response.status(500).json({ error: 'Failed to create product' });
        });
});
app.post('/stock', (request: Request, response: Response) => {
    postStock(request)
        .then(result => response.status(result.status).json(result.newStock))
        .catch(error => {
            console.error('Error al crear el producto:', error);
            response.status(500).json({ error: 'Failed to create product' });
        });
});
app.delete('/products/:id', (request: Request, response: Response) => {
    deleteProduct(request).then(result => response.status(200).json(result)).catch(error => {
        console.error('Error al crear el producto:', error);
        response.status(500).json({ error: 'Failed to create product' });
    });

})

// // Endpoint para agregar un nuevo dato



app.put('/products/:id', async (request: Request, response: Response) => {
    try {
        const modifyProduct = await putProducts(request)
        response.status(modifyProduct.status).json(modifyProduct.error || modifyProduct.message);
    } catch (error) {
        console.log(error)
    }
});

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


