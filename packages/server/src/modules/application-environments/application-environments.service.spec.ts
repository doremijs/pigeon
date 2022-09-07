// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ApplicationEnvironmentsService } from './application-environments.service'

describe('ApplicationEnvironmentsService', () => {
  let service: ApplicationEnvironmentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationEnvironmentsService]
    }).compile()

    service = module.get<ApplicationEnvironmentsService>(ApplicationEnvironmentsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
