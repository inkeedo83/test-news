import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseReadDto, IdDto } from 'src/common/types/types';

export class CreateTagDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class ReadTagsDto extends BaseReadDto {}

export class DeleteTagDto extends IdDto {}
