import {Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user-dto';

//após refatorar e criar uma função é possível reduzir a quantidade de código e usar a notação abaixo
//e colocar essa notação no topo da controller
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService){}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto){
    this.userService.create(body.email, body.password);
  }

  //caso queira usar a classe Genérica, usar o decorator abaixo
  //@UseInterceptors(ClassSerializerInterceptor)
  //aqui estamos usando o interceptor que criamos no projeto
  //@UseInterceptors(new SerializeInterceptor(UserDto))
  
  @Get('/:id')
  async findUser(@Param('id') id: string){
    console.log('handle is running');
    const user = await this.userService.findOne(parseInt(id));
    if(!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  async listAll(@Query('email') email: string){
    const user = await this.userService.find(email);
    if(!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string){
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
    return this.userService.update(parseInt(id), body);
  }
}
