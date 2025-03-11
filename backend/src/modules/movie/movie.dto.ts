import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

class MovieQueryDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  url: string;
}

class MovieDownloadQueryDto extends MovieQueryDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  itag: number;
}

export { MovieQueryDto, MovieDownloadQueryDto };
