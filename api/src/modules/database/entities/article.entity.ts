import { CATEGORIES, Category } from 'src/modules/category/services/category.service';
import { Tag } from 'src/modules/database/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column('text', { nullable: true })
  image: string | null;

  @Column('int', { default: 0 })
  watchCount: number;

  @Column('boolean', { default: false })
  isImportant: boolean;

  @Column('boolean', { default: false })
  isVeryImportant: boolean;

  @Column('enum', { enum: CATEGORIES })
  category: Category;

  @OneToMany(() => ArticleTag, articleTag => articleTag.article)
  articleTags: ArticleTag[];

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;
}

@Entity()
export class ArticleTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  articleId: string;

  @ManyToOne(() => Article, article => article.articleTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column('uuid')
  tagId: string;

  @ManyToOne(() => Tag, tag => tag.articleTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagId' })
  tag: Tag;
}
