import RootLayout from "../../Layouts/RootLayout"

const Settings = () => {
  return (
    <RootLayout>
      <div className="setting w-full">
        <div className="setting-top flex h-10 bg-red-300 w-full">
          <h1>header</h1>
          <div>signout</div>
        </div>
        <div className="setting-body">
          <div className="setting-left">left</div>
          <div className="setting-right">right</div>
        </div>
      </div>
    </RootLayout>
  )
}

export default Settings
