// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigurationItemsService } from './configuration-items.service'

describe('ConfigurationItemsService', () => {
  let service: ConfigurationItemsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationItemsService]
    }).compile()

    service = module.get<ConfigurationItemsService>(ConfigurationItemsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
