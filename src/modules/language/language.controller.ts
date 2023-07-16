import { Controller, Inject } from '@nestjs/common';
import { LanguageService } from 'src/modules/language/language.service';

@Controller()
export class LanguageController {
  constructor(
    @Inject(LanguageService) private readonly languageService: LanguageService,
  ) {}
}
