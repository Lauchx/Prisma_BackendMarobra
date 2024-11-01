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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const client_1 = require("../../database/client");
//import { Response,  Request } from "express"; --> No me deja parsear a JSON. Si yo importo esto.
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Obtener los productos de la base de datos
            const products = yield client_1.prisma.product.findMany(); // Asegúrate de usar await
            console.log("Estos son los productos: " + products); // Imprime los productos en la consola
            if (products.length <= 0)
                return { status: 404, body: { message: "No hay productos" } };
            // Devolver los productos en formato JSON
            return { body: products, status: 200 };
        }
        catch (error) {
            console.error('Error fetching products:', error);
            return { error: 'Failed to fetch products', status: 500 };
        }
    });
}
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, price } = yield request.body;
            const product = yield client_1.prisma.product.create({ data: { name, price } });
            return { body: product, status: 201 };
        }
        catch (error) {
            console.error('Error creating product:', error);
            return { error: 'Failed to create product', status: 500 };
        }
    });
}
