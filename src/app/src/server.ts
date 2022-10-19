import '@app/handlers'
import { json, urlencoded } from 'express';
import { Container } from "inversify";
import { InversifyExpressServer } from 'inversify-express-utils';
import fileUpload from 'express-fileupload'
import { IProductService } from './services/interfaces/product.interface';
import types from '@shared/types'
import { ProductService } from './services/product';
import { containerCore } from '@core/app'
import mongoose from 'mongoose';

const container = new Container()

export class Server {
  constructor(){
    this.configDependencies()
    this.initServer()
  }

  private configDependencies(): void {
    //services
    containerCore(container)
    container.bind<IProductService>(types.ProductService).to(ProductService)
  }

  private initServer(): void {
    mongoose.connect('mongodb+srv://curso:curso@cluster0.vnvbd.mongodb.net/managerp?retryWrites=true&w=majority')
      .then(()=>{
        let server = new InversifyExpressServer(container);

        server.setConfig(app=>{
          app.use(json())
          app.use(urlencoded({extended: true}))
          app.use(fileUpload())
        })

        let app = server.build()
        app
          .listen(3000,()=> console.log('Servidor subiu'))
      })
      .catch(err=>console.error)
  }
}