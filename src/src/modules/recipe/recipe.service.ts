import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ) {}

  create(recipe: CreateRecipeDto) {
    return this.recipeRepository.save({ ...recipe });
  }

  list() {
    return this.recipeRepository.find();
  }

  single(id: string) {
    const recipe = this.recipeRepository.findOne({ where: { id: id } });

    if (!recipe) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    return recipe;
  }

  update(id: string, { description }: UpdateRecipeDto) {
    return this.recipeRepository.update(
      { id: id },
      { description: description },
    );
  }

  remove(id: string) {
    return this.recipeRepository.delete({ id });
  }
}
