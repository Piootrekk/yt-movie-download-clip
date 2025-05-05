import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class MovieErrorDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  message: string;
}

type TMovieErrorDto = InstanceType<typeof MovieErrorDto>;

export { MovieErrorDto };
export type { TMovieErrorDto };
