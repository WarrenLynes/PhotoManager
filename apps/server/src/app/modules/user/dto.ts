import { IsOptional, IsString, ValidateNested } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  public name: string;
  @IsString()
  public email: string;
  @IsString()
  public password: string;
  @IsString()
  public phone: string;

}
