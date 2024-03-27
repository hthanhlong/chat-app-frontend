import Account from './components/Account'
import Friends from './components/Friends'
import Help from './components/Help'
import Notifications from './components/Notifications'
import Privacy from './components/Privacy'
import Profiles from './components/Profiles'
import Security from './components/Security'

export const LIST_SETTINGS = [
  {
    id: 0,
    title: 'Friends',
  },
  {
    id: 1,
    title: 'Profile',
  },
  {
    id: 2,
    title: 'Account',
  },
  {
    id: 3,
    title: 'Security',
  },
  {
    id: 4,
    title: 'Notifications',
  },
  {
    id: 5,
    title: 'Privacy',
  },
  {
    id: 6,
    title: 'Help',
  },
]

export const LIST_COMPONENTS = [
  {
    component: <Friends />,
  },
  {
    component: <Profiles />,
  },
  {
    component: <Account />,
  },
  {
    component: <Security />,
  },
  {
    component: <Notifications />,
  },
  {
    component: <Privacy />,
  },
  {
    component: <Help />,
  },
]
