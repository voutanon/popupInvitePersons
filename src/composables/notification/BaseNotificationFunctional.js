import { reactive } from 'vue'

export function baseNotificationFunctional() {
  // Types notification: success, warn, error, default
  const notificationData = reactive({
    visible: false,
    type: 'default',
    message: null
  })
  function showNotification(validation) {
    notificationData.visible = true
    if(validation && typeof validation === 'object') {
      if(validation.length === 0) {
        notificationData.type = 'success'
        notificationData.message = notificationData.message || 'Success'
      } else if(validation.length) {
        notificationData.type = 'error'
        notificationData.message = notificationData.message || 'Error'
      }
    } else if(validation && typeof validation === 'string') {
      notificationData.type = 'default'
    } else {
      notificationData.type = 'warn'
    }
    setTimeout(() => {
      notificationData.visible = false
    }, 5000);
  }
  return {
    showNotification,
    notificationData
  }
}