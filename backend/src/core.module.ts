import { Module } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import { HttpConverterModule } from './config/global-error-handler/http-error/http-converter.module';

@Module({
  imports: [AppModule, HttpConverterModule],
})
class CoreModule {}

export { CoreModule };
