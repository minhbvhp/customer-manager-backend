import { Controller, Get } from '@nestjs/common';
import Province from 'src/addresses/entities/province.entity';
import { Public } from 'src/auth/auth.decorators';
import { AddressesService } from './addresses.service';

@Public()
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  async findAllProvinces(): Promise<Province[]> {
    const provinces = await this.addressesService.findAllProvinces();
    return provinces;
  }
}
