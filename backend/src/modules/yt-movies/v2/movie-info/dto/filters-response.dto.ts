import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

class FiltersItemDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  itag: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  url: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  container: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  audioCodec?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  videoCodec?: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  fps?: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  width?: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  height?: number;
}

class FiltersResponseDto {
  @ApiProperty({
    type: FiltersItemDto,
    isArray: true,
  })
  @IsArray()
  @Type(() => FiltersItemDto)
  audio: FiltersItemDto[];

  @ApiProperty({
    type: FiltersItemDto,
    isArray: true,
  })
  @IsArray()
  @Type(() => FiltersItemDto)
  video: FiltersItemDto[];

  @ApiProperty({
    type: FiltersItemDto,
    isArray: true,
  })
  @IsArray()
  @Type(() => FiltersItemDto)
  both: FiltersItemDto[];
}

type TFiltersResponseDto = InstanceType<typeof FiltersResponseDto>;
type TFiltersItemDto = InstanceType<typeof FiltersItemDto>;

export { FiltersResponseDto, FiltersItemDto };
export type { TFiltersResponseDto, TFiltersItemDto };
