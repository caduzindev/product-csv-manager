import { IProduct } from "@core/entities/product";

export interface IProductRepository {
  add(product: IProduct|IProduct[]): Promise<void>
  getAll(): Promise<IProduct[]>
}