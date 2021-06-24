import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { MedicamentModule } from './medicament/medicament.module';
import { FirstMiddleware } from './middlewares/first.middleware';
import { SecondMiddleware } from './middlewares/second.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hopital',
    entities: ["dist/**/*.entity.{js,ts}"],
    synchronize: true,
    logging: true
  }), ConfigModule.forRoot({
    isGlobal: true
    
  }), UserModule, PatientModule, MedicamentModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer): any {
    HelmetMiddleware.configure({});
    consumer
    .apply(HelmetMiddleware)
    .forRoutes('')
    .apply(FirstMiddleware)
    .forRoutes('')
    .apply(SecondMiddleware)
    .forRoutes('')
    
  }
}
