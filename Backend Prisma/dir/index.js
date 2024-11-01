"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const _server_1 = require("./routes/products/+server");
//const crypto = require('node:crypto')
const app = (0, express_1.default)();
app.disable('x-powered-by');
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const { validateProduct } = require('./schemas/products_schema');
// Endpoint para obtener los datos
app.get('/products', (response) => {
    //fs.writeFileSync('./json/products.json', JSON.stringify(dataProducts, null, 2));
    const products = (0, _server_1.GET)();
    return response.status(200).json(products);
});
// Endpoint para crear un nuevo producto
app.post('/products', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, _server_1.POST)(request);
        return response.status(201).json(result);
    }
    catch (error) {
        console.log(error);
    }
}));
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
