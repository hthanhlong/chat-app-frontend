import Account from "./components/Account"
import Help from "./components/Help"
import Notifications from "./components/Notifications"
import Privacy from "./components/Privacy"
import Profiles from "./components/Profiles"
import Security from "./components/Security"

export const LIST_SETTINGS = [
  {
    id: 0,
    title: "Profile",
  },
  {
    id: 1,
    title: "Account",
  },
  {
    id: 2,
    title: "Security",
  },
  {
    id: 3,
    title: "Notifications",
  },
  {
    id: 4,
    title: "Privacy",
  },
  {
    id: 5,
    title: "Help",
  },
]

export const LIST_COMPONENTS = [
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
