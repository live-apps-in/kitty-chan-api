import { Module } from '@nestjs/common';
import { LanguageService } from 'src/modules/language/language.service';

@Module({
  imports: [],
  providers: [LanguageService],
  controllers: [],
})
export class LanguageModule {}
