// Auto generated
import { Module } from '@nestjs/common'
import { ApplicationEnvironmentsController } from './application-environments.controller'
import { ApplicationEnvironmentsService } from './application-environments.service'

@Module({
  providers: [ApplicationEnvironmentsService],
  controllers: [ApplicationEnvironmentsController],
  exports: [ApplicationEnvironmentsService]
})
export class ApplicationEnvironmentsModule {}
