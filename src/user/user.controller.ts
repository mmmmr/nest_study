import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Headers, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 1,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: 'white',  //背景颜色
    })


    req.session.code = captcha.text
    console.log(captcha.text, req.session.code)
    res.type('image/svg+xml')
    res.send(captcha.data)
  }

  @Post('login')
  login(@Body() body, @Req() req) {
    let msg = '登录失败！'
    if (body.code === req.session.code) {
      msg = '登录成功！'
    }
    return {code: 200, msg}
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers:any) {
    console.log(id, headers);
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
