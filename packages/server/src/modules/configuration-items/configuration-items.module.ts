// Auto generated
import { Module } from '@nestjs/common'
import { ConfigurationItemsController } from './configuration-items.controller'
import { ConfigurationItemsService } from './configuration-items.service'

@Module({
  providers: [ConfigurationItemsService],
  controllers: [ConfigurationItemsController],
  exports: [ConfigurationItemsService]
})
export class ConfigurationItemsModule {}
