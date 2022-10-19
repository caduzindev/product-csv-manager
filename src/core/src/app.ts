import { Container } from "inversify";
import { IProductRepository } from "./respositories/interfaces/product";
import types from '@shared/types'
import { ProductRepository } from "./respositories/product";

export const containerCore = (container: Container) => {
  // repositories
  container.bind<IProductRepository>(types.ProductRepository).to(ProductRepository)
}