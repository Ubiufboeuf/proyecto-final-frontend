function detectDeviceType () {
  let deviceType = localStorage.getItem('deviceType')
  if (deviceType) {
    document.body.classList.add(deviceType)
    return
  }
  
  const ua = navigator.userAgent
  const mobileRegex = /(Mobi|Android(?!.*Nexus 7)|iPhone|iPod|Windows Phone|BlackBerry|Symbian|IEMobile|Opera Mini|Fennec|webOS|hpwos|avantgo|bada|blazer|compal|elaine|hiptop|kindle|lge|maemo|midp|mmp|netfront|palm|phone|plucker|pocket|psp|series60|treo|up\.browser|up\.link|vodafone|wap|windows ce|xda|xiino)/i
  
  if (mobileRegex.test(ua) && !/iPad/i.test(ua)) {
    deviceType = 'is-mobile-ua'
  } else {
    deviceType = 'is-laptop-ua'
  }

  document.body.classList.add(deviceType)
  localStorage.setItem('deviceType', deviceType)
}

detectDeviceType()
