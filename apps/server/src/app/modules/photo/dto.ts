import { IsString } from 'class-validator';

export default class CreatePhotoDto {
  @IsString()
  public name: string;
  @IsString()
  public imageUrl: string;
}
