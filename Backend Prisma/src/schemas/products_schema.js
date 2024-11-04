const zod = require('zod')

    const stockSchema = zod.object({
        outbound: zod.number().min(0).default(0),
        inbound: zod.number().min(0).default(0),
        current_quantity: zod.number().min(0, 'Current_quantity is required'),
    });
const productSchema = zod.object({
    name: zod.string({
        invalid_type_error: "Product name must be a string",
        require_error: "Name is required"
    }).min(1, 'Product name is required'),

    width: zod.number().positive({
        message: "Width must be a positive number"
    }).min(0, 'Width is required'),

    height: zod.number().positive({
        message: "Height must be a positive number"
    }).min(0, 'Height is required'),

    length: zod.number().positive({
        message: "Weight must be a positive number"
    }).min(0, 'Length is required')
    // id_Stock: zod.string({
    //     invalid_type_error: "id_stock name must be a string",
    //     require_error: "Name is required"
    // }).min(25, 'id_Stock name is required').max(25)
})
const productSchema_InPut = zod.object({
    name: zod.string({
        invalid_type_error: "Product name must be a string",
        require_error: "Name is required"
    }).min(1, 'Product name is required'),

    width: zod.number().positive({
        message: "Width must be a positive number"
    }).min(0, 'Width is required'),

    height: zod.number().positive({
        message: "Height must be a positive number"
    }).min(0, 'Height is required'),

    length: zod.number().positive({
        message: "Weight must be a positive number"
    }).min(0, 'Length is required'),
    id_Stock: zod.string({
        invalid_type_error: "id_stock name must be a string",
        require_error: "Name is required"
    }).min(25, 'id_Stock name is required').max(25),
    stock: stockSchema
})
function validateProduct_InPut(objet){
return productSchema_InPut.safeParse(objet)
}

function validateProduct(object) {
    return productSchema.safeParse(object)
}
function validateStock(object){
    console.log(stockSchema.safeParse(object))
    return stockSchema.safeParse(object);
}
module.exports = {
    validateProduct,
    validateStock,
    validateProduct_InPut
}