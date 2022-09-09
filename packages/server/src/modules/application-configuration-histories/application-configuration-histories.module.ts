// Auto generated
import { Module } from '@nestjs/common'
import { ApplicationConfigurationHistoriesController } from './application-configuration-histories.controller'
import { ApplicationConfigurationHistoriesService } from './application-configuration-histories.service'

@Module({
  providers: [ApplicationConfigurationHistoriesService],
  controllers: [ApplicationConfigurationHistoriesController],
  exports: [ApplicationConfigurationHistoriesService]
})
export class ApplicationConfigurationHistoriesModule {}
