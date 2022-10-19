import { IProduct } from "@core/entities/product";
import { model, Schema } from "mongoose";

const ProductSchema = new Schema<IProduct>({
  nome: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  valor: {
    type: Number,
    required: false,
    default: 0
  },
  peso: {
    type: Number,
    required: true
  }
})

export const ProductModel = model('Product', ProductSchema)