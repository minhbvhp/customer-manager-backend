import { IsNotEmpty, IsString } from 'class-validator';
import {
  FULLNAME_MUST_NOT_EMPTY,
  TAXCODE_MUST_NOT_EMPTY,
  WARDCODE_MUST_NOT_EMPTY,
} from 'src/utils/messageConstants';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty({ message: TAXCODE_MUST_NOT_EMPTY })
  taxCode: string;

  @IsString()
  urn: string;

  @IsString()
  @IsNotEmpty({ message: FULLNAME_MUST_NOT_EMPTY })
  fullName: string;

  @IsString()
  street: string;

  @IsNotEmpty({ message: WARDCODE_MUST_NOT_EMPTY })
  wardCode: string;
}
