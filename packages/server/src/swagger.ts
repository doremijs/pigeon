import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { version } from '../package.json'

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Pigeon API')
    .setDescription('API文档')
    .setVersion(version)
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  })
}
