import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProjectsModule } from './projects/projects.module'
import { ApplicationsModule } from './applications/applications.module'
import { ApplicationEnvironmentsModule } from './application-environments/application-environments.module'
import { ConfigurationItemsModule } from './configuration-items/configuration-items.module'
import { ConfigMapsModule } from './config-maps/config-maps.module'
import { ApplicationConfigurationsModule } from './application-configurations/application-configurations.module'
import { ApplicationConfigurationHistoriesModule } from './application-configuration-histories/application-configuration-histories.module'

export const openedModules = [
  AuthModule,
  UsersModule,
  ProjectsModule,
  ApplicationsModule,
  ApplicationEnvironmentsModule,
  ConfigurationItemsModule,
  ConfigMapsModule,
  ApplicationConfigurationsModule,
  ApplicationConfigurationHistoriesModule
]
