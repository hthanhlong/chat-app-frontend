class LocalStorageService {
  LOCAL_STORAGE_KEY = {
    USER_UUID: 'wdXSDDpECBCNgyaF',
    USERNAME: 'Ufwr5+igITVbTmUy',
    IS_LOGGED: 'F7Uk5kTgIn8OcsAD',
    ACCESS_TOKEN: 'jRqUlx1xsPUmj19p',
    REFRESH_TOKEN: 'ymof3KCseoiFaz33',
    IS_NOTIFICATION: 'n8OcsAKsd1xsn79',
    FLOWBITE_THEME_MODE: 'flowbite-theme-mode',
  }

  setUserUuid(value: string) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY.USER_UUID, value)
  }

  getUserUuid() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY.USER_UUID)
  }

  getUsername() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY.USERNAME)
  }

  setUsername(value: string) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY.USERNAME, value)
  }

  removeUsername() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY.USERNAME)
  }

  removeUserUuid() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY.USER_UUID)
  }

  setAccessToken(value: string) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY.ACCESS_TOKEN, value)
  }

  getAccessToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY.ACCESS_TOKEN)
  }

  removeAccessToken() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY.ACCESS_TOKEN)
  }

  setIsLogged(value: boolean) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY.IS_LOGGED, value.toString())
  }

  getIsLogged() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY.IS_LOGGED)
  }

  setRefreshToken(value: string) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY.REFRESH_TOKEN, value)
  }

  getRefreshToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY.REFRESH_TOKEN)
  }

  removeRefreshToken() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY.REFRESH_TOKEN)
  }

  setIsNotification(value: boolean) {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY.IS_NOTIFICATION,
      value.toString(),
    )
  }

  getIsNotification() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY.IS_NOTIFICATION)
  }

  removeIsNotification() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY.IS_NOTIFICATION)
  }

  setFlowbiteThemeMode(value: string) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY.FLOWBITE_THEME_MODE, value)
  }

  getFlowbiteThemeMode() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY.FLOWBITE_THEME_MODE)
  }

  removeFlowbiteThemeMode() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY.FLOWBITE_THEME_MODE)
  }

  clear() {
    localStorage.clear()
  }
}

export default new LocalStorageService()
