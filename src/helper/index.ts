import moment from 'moment'

export const formatDate = (timer: string) => {
  if (!timer) return
  const currentTime = moment()
  const messageTime = moment(timer)
  let displayTime

  const duration = moment.duration(currentTime.diff(messageTime))

  if (duration.asDays() >= 1) {
    displayTime = `${Math.floor(duration.asDays())} day${Math.floor(duration.asDays()) > 1 ? 's' : ''} ago`
  } else if (duration.asHours() >= 1) {
    displayTime = `${Math.floor(duration.asHours())} hour${Math.floor(duration.asHours()) > 1 ? 's' : ''} ago`
  } else if (duration.asMinutes() >= 1) {
    displayTime = `${Math.floor(duration.asMinutes())} minute${Math.floor(duration.asMinutes()) > 1 ? 's' : ''} ago`
  } else {
    displayTime = 'Just now'
  }
  return displayTime
}
