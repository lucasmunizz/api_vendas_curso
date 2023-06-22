import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import Customer from '../../../customers/typeorm/entities/Customer';
import Product from '../../../products/typeorm/entities/Product';

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
class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.findOne(id, {
      relations: ['order_products', 'customer'],
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

export default OrdersRepository;
