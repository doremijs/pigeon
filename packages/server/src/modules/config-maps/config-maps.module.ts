// Auto generated
import { Module } from '@nestjs/common'
import { ConfigMapsController } from './config-maps.controller'
import { ConfigMapsService } from './config-maps.service'

@Module({
  providers: [ConfigMapsService],
  controllers: [ConfigMapsController],
  exports: [ConfigMapsService]
})
export class ConfigMapsModule {}
