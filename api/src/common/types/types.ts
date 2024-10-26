import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { ORDERS } from 'src/common/constants/constants';

export type OrderType = (typeof ORDERS)[number];

export class IdDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  id: string;
}

export class BaseReadDto {
  @ApiPropertyOptional({ type: Number, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  pattern?: string;

  @ApiPropertyOptional({ enum: ORDERS, type: String })
  @IsEnum(ORDERS)
  @IsOptional()
  order?: OrderType;
}

export class PaginatedEntityDto<T> {
  @IsArray()
  data: T[];

  @ApiProperty({ type: Number })
  count: number;
}
