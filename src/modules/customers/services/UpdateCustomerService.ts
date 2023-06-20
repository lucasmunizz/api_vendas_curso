import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const customerUpdateEmail = await customersRepository.findByEmail(email);

    if (customerUpdateEmail && customerUpdateEmail.id !== id) {
      throw new AppError('There is already one customer with this email');
    }

    customer.email = email;
    customer.name = name;

    await customersRepository.save(customer);

    return customer;
  }
}
