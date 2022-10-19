import { IProduct } from "@core/entities/product";
import { ProductModel } from "@core/models/product";
import { injectable } from "inversify";
import { IProductRepository } from "./interfaces/product";

@injectable()
export class ProductRepository implements IProductRepository {
  async add(product: IProduct | IProduct[]): Promise<void> {
    await ProductModel.create(product)
  }

  async getAll(): Promise<IProduct[]> {
    return await ProductModel.find({})
  }
}