import { Module } from '@nestjs/common';
import { WikiErrorService } from './wiki-error.service';
import WikiErrorCrudService from './wiki-error-crud.service';
import { WikiErrorController } from './wiki-error.controller';

@Module({
  controllers: [WikiErrorController],
  providers: [WikiErrorService, WikiErrorCrudService],
})
export class WikiErrorModule {}
