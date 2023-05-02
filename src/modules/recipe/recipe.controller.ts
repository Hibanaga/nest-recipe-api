import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { Role } from '../auth/decorators/role';
import { UserRole } from '../auth/entities/user.entity';
import { RoleGuard } from '../auth/guard/authorization.guard';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  findAll() {
    return this.recipeService.list();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.recipeService.single(id);
  }

  @Role(UserRole.User)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Post()
  create(@Body() recipeDto: CreateRecipeDto, @Request() req) {
    const { sub } = req.user;
    return this.recipeService.create(recipeDto, sub);
  }

  @Role(UserRole.Admin)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.recipeService.remove(id);
  }
}
