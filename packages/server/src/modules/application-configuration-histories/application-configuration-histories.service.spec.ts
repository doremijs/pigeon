// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ApplicationConfigurationHistoriesService } from './application-configuration-histories.service'

describe('ApplicationConfigurationHistoriesService', () => {
  let service: ApplicationConfigurationHistoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationConfigurationHistoriesService]
    }).compile()

    service = module.get<ApplicationConfigurationHistoriesService>(ApplicationConfigurationHistoriesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
