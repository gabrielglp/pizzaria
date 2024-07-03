import { Request, Response } from "express";
import { RemoveOrderSerivce } from "../../services/order/RemoveOrderService";

class RemoveOrderController {
    async handle(req: Request, res: Response) {
        
        const order_id = req.query.order_id as string;

        const removeOrder = new RemoveOrderSerivce();

        const order = await removeOrder.execute({
            order_id
        })

        return res.json(order);

    }
}

export { RemoveOrderController }