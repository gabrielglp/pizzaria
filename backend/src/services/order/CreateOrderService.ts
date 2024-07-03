import prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
    name: string;
    // id: string;
    // status: boolean;
    // draft: boolean;
}

class CreateOrderService {
    async execute({ table, name }: OrderRequest) {
        const order = await prismaClient.order.create({
            data: {
                table: table,
                name: name
            }
        })

        return order;
    }
}

export { CreateOrderService };