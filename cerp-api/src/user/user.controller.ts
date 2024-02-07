import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Put('activeUser')
  async registerUser(@Body() val) {
    return await this.userService.activateUser(val);
  }

  @Get('userTenant/:email')
  async getTenantByUser(@Param('email') email: string){
    const tenants = await this.userService.findTenantByEmail(email);
    return {count:tenants.length,tenants,}
  }
}
