import prismaClient from "../../prisma";

interface RemoveOrderRequest {
    order_id: string;
}

class RemoveOrderSerivce {
    async execute({ order_id }: RemoveOrderRequest) {

        const removeOrder = await prismaClient.order.delete({
            where: {
                id: order_id
            }
        })

        return removeOrder

    }
}

export { RemoveOrderSerivce };