import { Article } from 'src/modules/database/entities/article.entity';
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => Article, article => article.category)
  articles: Article[];

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;
}
