// Auto generated
import { Module } from '@nestjs/common'
import { ApplicationsController } from './applications.controller'
import { ApplicationsService } from './applications.service'

@Module({
  providers: [ApplicationsService],
  controllers: [ApplicationsController],
  exports: [ApplicationsService]
})
export class ApplicationsModule {}
