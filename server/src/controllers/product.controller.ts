import { Request, Response } from "express";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {

    const product = await Product.create(req.body);
    res.status(201).json({ data: product })

};

export const getProducts = async (req: Request, res: Response) => {

    const products = await Product.findAll({
        order: [['id', 'ASC']],
    });
    res.json({ data: products })

};


export const getProductById = async (req: Request, res: Response) => {

    const { id } = req.params;
    const product = await Product.findByPk(id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json({ data: product })
};

export const updateProduct = async (req: Request, res: Response) => {

    const { id } = req.params;
    const product = await Product.findByPk(id)
    if (!product) return res.status(404).json({ error: 'Product not found' })

    // Actualizar el producto
    await product.update(req.body)
    await product.save()
    res.json({ data: product })

}

export const updateAvailability = async (req: Request, res: Response) => {

    const { id } = req.params;
    const product = await Product.findByPk(id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
        
    // Invertir el estado de disponibilidad
    const updatedProduct = await product.update({ availability: !product.dataValues.availability });
    res.json({ data: updatedProduct })
}


export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id)
    if (!product) return res.status(404).json({ error: 'Product not exists' })
    await product.destroy()
    res.json({ message: 'Product deleted' })

}