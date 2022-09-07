// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ApplicationConfigurationsService } from './application-configurations.service'

describe('ApplicationConfigurationsService', () => {
  let service: ApplicationConfigurationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationConfigurationsService]
    }).compile()

    service = module.get<ApplicationConfigurationsService>(ApplicationConfigurationsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
