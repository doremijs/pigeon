// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ApplicationConfigurationHiostoriesService } from './application-configuration-hiostories.service'

describe('ApplicationConfigurationHiostoriesService', () => {
  let service: ApplicationConfigurationHiostoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationConfigurationHiostoriesService]
    }).compile()

    service = module.get<ApplicationConfigurationHiostoriesService>(ApplicationConfigurationHiostoriesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
