import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Recipe } from '../../recipe/entities/recipe.entity';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'varchar', default: UserRole.User, name: 'userRole' })
  role: UserRole;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];
}
