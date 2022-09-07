// Auto generated
import { Module } from '@nestjs/common'
import { ApplicationConfigurationHiostoriesController } from './application-configuration-hiostories.controller'
import { ApplicationConfigurationHiostoriesService } from './application-configuration-hiostories.service'

@Module({
  providers: [ApplicationConfigurationHiostoriesService],
  controllers: [ApplicationConfigurationHiostoriesController],
  exports: [ApplicationConfigurationHiostoriesService]
})
export class ApplicationConfigurationHiostoriesModule {}
