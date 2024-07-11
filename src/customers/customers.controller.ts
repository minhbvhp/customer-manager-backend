import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import Customer from 'src/customers/entities/customer.entity';
import { Public } from 'src/auth/auth.decorators';
import {
  CUSTOMER_ALREADY_EXISTED,
  CUSTOMER_NOT_FOUND,
} from 'src/utils/messageConstants';

// @Public()
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getAllCustomers(): Promise<Customer[]> {
    const customers = await this.customersService.getAllCustomers();
    return customers;
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    const customer = await this.customersService.getCustomerById(Number(id));

    if (!customer) {
      throw new NotFoundException(CUSTOMER_NOT_FOUND);
    }
    return customer;
  }

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    const newCustomer =
      await this.customersService.createCustomer(createCustomerDto);

    if (!newCustomer) {
      throw new ConflictException(CUSTOMER_ALREADY_EXISTED);
    }

    return {
      message: 'Đã tạo khách hàng mới',
    };
  }

  @Patch(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const updatedCustomer = await this.customersService.updateCustomer(
      Number(id),
      updateCustomerDto,
    );

    if (!updatedCustomer) {
      throw new NotFoundException(CUSTOMER_NOT_FOUND);
    }
    return {
      message: 'Đã cập nhật thông tin khách hàng',
    };
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    const deletedCustomer = await this.customersService.deleteCustomer(
      Number(id),
    );

    if (!deletedCustomer) {
      throw new NotFoundException(CUSTOMER_NOT_FOUND);
    }

    return {
      message: 'Đã xóa khách hàng',
    };
  }
}
