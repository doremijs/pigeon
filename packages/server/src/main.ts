import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { PrismaService } from './providers/prisma.service'
import { setupSwagger } from './swagger'
import { HttpExceptionFilter } from './filters/HttpExceptionFilter'

async function bootstrap() {
  const port = process.env.PORT || 9001
  const app = await NestFactory.create(AppModule)

  // 错误拦截
  app.useGlobalFilters(new HttpExceptionFilter())

  // 验证
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  // prisma
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.setGlobalPrefix('/api')
  // 版本
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1'
  // })

  // swagger
  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app)
  }

  await app.listen(port)
  Logger.log('Server listening on port ' + port)
}
bootstrap()
