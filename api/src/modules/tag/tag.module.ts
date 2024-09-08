import { Module } from '@nestjs/common';
import { TagController } from 'src/modules/tag/controllres/tag.controller';
import { TagService } from 'src/modules/tag/services/tag.service';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
