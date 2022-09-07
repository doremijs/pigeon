// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigurationItemsController } from './configuration-items.controller'
import { ConfigurationItemsService } from './configuration-items.service'

describe('ConfigurationItemsController', () => {
  let controller: ConfigurationItemsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationItemsController],
      providers: [ConfigurationItemsService]
    }).compile()

    controller = module.get<ConfigurationItemsController>(ConfigurationItemsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
