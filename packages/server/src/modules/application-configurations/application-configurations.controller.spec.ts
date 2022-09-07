// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ApplicationConfigurationsController } from './application-configurations.controller'
import { ApplicationConfigurationsService } from './application-configurations.service'

describe('ApplicationConfigurationsController', () => {
  let controller: ApplicationConfigurationsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationConfigurationsController],
      providers: [ApplicationConfigurationsService]
    }).compile()

    controller = module.get<ApplicationConfigurationsController>(ApplicationConfigurationsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
