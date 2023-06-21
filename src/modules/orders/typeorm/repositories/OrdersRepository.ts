import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import Customer from '../../../customers/typeorm/entities/Customer';
import Product from 'src/modules/products/typeorm/entities/Product';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
class CustomersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = await this.create({
      customer,
      order_products: products,
    });

    return order;
  }
}

export default CustomersRepository;
