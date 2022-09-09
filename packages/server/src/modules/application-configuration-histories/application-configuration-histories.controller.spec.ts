// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ApplicationConfigurationHistoriesController } from './application-configuration-histories.controller'
import { ApplicationConfigurationHistoriesService } from './application-configuration-histories.service'

describe('ApplicationConfigurationHistoriesController', () => {
  let controller: ApplicationConfigurationHistoriesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationConfigurationHistoriesController],
      providers: [ApplicationConfigurationHistoriesService]
    }).compile()

    controller = module.get<ApplicationConfigurationHistoriesController>(ApplicationConfigurationHistoriesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
