import { ArticleTag } from 'src/modules/database/entities/article.entity';
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => ArticleTag, articleTag => articleTag.tag)
  articleTags: ArticleTag[];
}
