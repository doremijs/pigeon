import { menuRoutes } from '@/routes/protected'
import { useAuth } from '@/stores'
import { MenuRouteItem } from '@/types'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { MenuDataItem, ProBreadcrumb, ProLayout } from '@ant-design/pro-components'
import { Avatar, Dropdown, Menu } from 'antd'
import { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

interface MainLayoutProps {
  children?: ReactNode
}

function convertRouteToMenu(route: MenuRouteItem, parentPath: string): MenuDataItem {
  const currentPath = `${parentPath}/${route.path}`
  const ret: MenuDataItem = {
    path: currentPath,
    name: route.name,
    icon: route.icon
  }
  if (route.children) {
    ret.routes = route.children.map(i => convertRouteToMenu(i, currentPath))
  }
  return ret
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  return (
    <div className="h-screen">
      <ProLayout
        title="Pigeon"
        waterMarkProps={{
          content: 'Pigeon'
        }}
        menu={{
          request: () => Promise.resolve(menuRoutes.map(r => convertRouteToMenu(r, '/app')))
        }}
        menuItemRender={(item, dom) =>
          item.isUrl ? (
            <a href={item.path} target={item.path}>
              {dom}
            </a>
          ) : (
            <NavLink to={item.path!}>{dom}</NavLink>
          )
        }
        headerContentRender={() => <ProBreadcrumb />}
        rightContentRender={() => (
          <Dropdown
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item key="logout" onClick={logout}><LogoutOutlined className='mr-2' />退出登录</Menu.Item>
              </Menu>
            }
          >
            <div className='cursor-pointer'>
              <span className="mr-2">{user?.name}</span>
              <Avatar shape="square" icon={<UserOutlined />} />
            </div>
          </Dropdown>
        )}
        onMenuHeaderClick={() => navigate('/app')}
        // onPageChange={console.log}
      >
        {children}
      </ProLayout>
    </div>
  )
}

export default MainLayout
