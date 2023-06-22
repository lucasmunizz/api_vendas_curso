import AppError from '../../../shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../../products/typeorm/repositories/ProductRepository';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import CustomersRepository from '../../customers/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateProductService {
  public async execute({ customer_id, products }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const ordersRepository = getCustomRepository(OrdersRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find the customer with the given id');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find products with the given ids');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentsProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentsProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentsProducts[0].id}`,
      );
    }

    await productsRepository.save(product);

    return product;
  }
}
