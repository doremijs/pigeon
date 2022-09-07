// Auto generated
import { Module } from '@nestjs/common'
import { ApplicationConfigurationsController } from './application-configurations.controller'
import { ApplicationConfigurationsService } from './application-configurations.service'

@Module({
  providers: [ApplicationConfigurationsService],
  controllers: [ApplicationConfigurationsController],
  exports: [ApplicationConfigurationsService]
})
export class ApplicationConfigurationsModule {}
