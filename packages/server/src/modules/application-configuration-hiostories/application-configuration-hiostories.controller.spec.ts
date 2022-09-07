// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ApplicationConfigurationHiostoriesController } from './application-configuration-hiostories.controller'
import { ApplicationConfigurationHiostoriesService } from './application-configuration-hiostories.service'

describe('ApplicationConfigurationHiostoriesController', () => {
  let controller: ApplicationConfigurationHiostoriesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationConfigurationHiostoriesController],
      providers: [ApplicationConfigurationHiostoriesService]
    }).compile()

    controller = module.get<ApplicationConfigurationHiostoriesController>(ApplicationConfigurationHiostoriesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
