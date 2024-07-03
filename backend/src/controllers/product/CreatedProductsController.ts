import { Request, Response } from "express";
import { CreatedProductsService } from "../../services/product/CreatedProductsService";

class CreatedProductsController {
    async handle( req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        const createdProductsService = new CreatedProductsService();

        if(!req.file) {
            throw new Error("error upload file")
        } else {
            const { originalname, filename: banner } = req.file;

            const product = await createdProductsService.execute({
                name,
                price,
                description,
                banner,
                category_id
            });
    
            return res.json(product);
        }

    };
};

export { CreatedProductsController };