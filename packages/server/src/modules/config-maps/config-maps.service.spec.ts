// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigMapsService } from './config-maps.service'

describe('ConfigMapsService', () => {
  let service: ConfigMapsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigMapsService]
    }).compile()

    service = module.get<ConfigMapsService>(ConfigMapsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
