import { IProduct } from "@core/entities/product";

export interface IProductService {
  createByCsv(data: Buffer): Promise<void>
  getAll(): Promise<IProduct[]>
}