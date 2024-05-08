import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import Customer from 'src/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async getAllCustomers() {
    const customers = await this.customersRepository.find({
      relations: ['ward.district.province'],
    });
    return customers;
  }

  async getCustomerById(customerId: number) {
    try {
      const customers = await this.customersRepository.findOne({
        where: {
          id: customerId,
        },
        relations: ['ward.district.province'],
      });

      return customers;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    try {
      const existedCustomer = await this.customersRepository.findOne({
        where: {
          taxCode: createCustomerDto.taxCode,
        },
      });

      if (!existedCustomer) {
        const newCustomer = await this.customersRepository.create({
          taxCode: createCustomerDto.taxCode,
          urn: createCustomerDto.urn,
          fullName: createCustomerDto.fullName,
          street: createCustomerDto.street,
        });

        await this.customersRepository.insert(newCustomer);

        return newCustomer;
      }
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }

    return null;
  }
}
