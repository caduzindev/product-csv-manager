import { inject, injectable } from "inversify";
import { IProductService } from '@app/services/interfaces/product.interface'
import { parseString } from "fast-csv";
import { IProduct } from '@core/entities/product'
import types from "@shared/types";
import { IProductRepository } from "@core/respositories/interfaces/product";
@injectable()
export class ProductService implements IProductService {
  constructor (@inject(types.ProductRepository) private productRepository: IProductRepository) {}

  async createByCsv(data: Buffer): Promise<void> {
    const products = await this.parseFileCsv(data)

    await this.productRepository.add(products)
  }

  async getAll(): Promise<IProduct[]> {
    return await this.productRepository.getAll()
  }

  private parseFileCsv(data: Buffer): Promise<IProduct[]> {
    return new Promise((resolve,reject) => {
      let result = []
      parseString(data.toString('utf8'), {headers: true,delimiter:';'})
      .on('data',row => {
        const data = row as IProduct
        result.push(data)
      })
      .on('error',reject)
      .on('end',()=>resolve(result))
    })
  }
}