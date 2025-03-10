import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class MovieQueryDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  url: string;
}

// class MovieDownloadQueryDto extends MovieQueryDto {
//   @IsNumber()

// }

export { MovieQueryDto };
