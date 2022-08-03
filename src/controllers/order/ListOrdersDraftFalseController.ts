import { Request, Response } from "express";
import { ListOrdersDraftFalseService } from "../../services/order/ListOrdersDraftFalseService";



class ListOrdersDraftFalseController{
    async handle(req: Request, res: Response) {

        const listOrdersDraftFalseService = new ListOrdersDraftFalseService()
        const orders  = await listOrdersDraftFalseService.execute()
        return res.json(orders)
    }
}

export { ListOrdersDraftFalseController }