import { IProductService } from "@app/services/interfaces/product.interface";
import types from "@shared/types";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost, interfaces} from "inversify-express-utils";

@controller('/product')
export class Product extends BaseHttpController implements interfaces.Controller{
  constructor(@inject(types.ProductService) private productService: IProductService) {
    super();
  }
  @httpPost('/csv')
  private createByCsv(req: Request,res: Response) {
    const productFile = req.files.product
    const file = Array.isArray(productFile) ? productFile[0].data : productFile.data

    this.productService.createByCsv(file)
  }
  @httpGet('/')
  private getAllProducts(req: Request,res: Response) {
    return this.productService.getAll()
  }
}