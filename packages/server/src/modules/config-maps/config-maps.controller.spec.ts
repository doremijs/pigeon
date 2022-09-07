// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigMapsController } from './config-maps.controller'
import { ConfigMapsService } from './config-maps.service'

describe('ConfigMapsController', () => {
  let controller: ConfigMapsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigMapsController],
      providers: [ConfigMapsService]
    }).compile()

    controller = module.get<ConfigMapsController>(ConfigMapsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
