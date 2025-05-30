import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../base-dto/query.dto';
import { IsNumber, IsOptional } from 'class-validator';

class StreamByItagQueryDto extends BaseQueryDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  itag: number;

  @ApiProperty({
    type: Number,
    required: false,
    default: 1024,
  })
  @IsNumber()
  @IsOptional()
  chunkSize?: number;
}

type TStreamByItagQueryDto = InstanceType<typeof StreamByItagQueryDto>;

export { StreamByItagQueryDto };
export type { TStreamByItagQueryDto };
