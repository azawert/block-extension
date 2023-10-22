import { ApiProperty } from '@nestjs/swagger';

export class SignUpBodyDto {
  @ApiProperty({
    example: 'test@test.ru',
  })
  email: string;

  @ApiProperty({
    example: '12345',
  })
  password: string;
}

export class SignInBodyDto {
  @ApiProperty({
    example: 'test@test.ru',
  })
  email: string;

  @ApiProperty({
    example: '12345',
  })
  password: string;
}

export class GetSessionDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    example: 'test@test.ru',
  })
  email: string;

  @ApiProperty()
  iat: number;
  @ApiProperty()
  exp: number;
}
