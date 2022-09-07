// Auto generated
import { Test, TestingModule } from '@nestjs/testing'
import { ApplicationEnvironmentsController } from './application-environments.controller'
import { ApplicationEnvironmentsService } from './application-environments.service'

describe('ApplicationEnvironmentsController', () => {
  let controller: ApplicationEnvironmentsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationEnvironmentsController],
      providers: [ApplicationEnvironmentsService]
    }).compile()

    controller = module.get<ApplicationEnvironmentsController>(ApplicationEnvironmentsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
