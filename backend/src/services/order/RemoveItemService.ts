import prismaClient from "../../prisma";

interface RemoveItemResquest {
    item_id: string;
}

class RemoveItemService {
    async execute({ item_id }: RemoveItemResquest) {

        const order = await prismaClient.item.delete({
            where: {
                id: item_id
            }
        })

        return order;
        
    }
}

export { RemoveItemService };