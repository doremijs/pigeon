// Auto generated
import { Module } from '@nestjs/common'
import { ApplicationConfigurationHistoriesService } from '../application-configuration-histories/application-configuration-histories.service'
import { ApplicationConfigurationsController } from './application-configurations.controller'
import { ApplicationConfigurationsService } from './application-configurations.service'

@Module({
  providers: [
    ApplicationConfigurationsService,
    ApplicationConfigurationHistoriesService
  ],
  controllers: [ApplicationConfigurationsController],
  exports: [ApplicationConfigurationsService]
})
export class ApplicationConfigurationsModule {}
