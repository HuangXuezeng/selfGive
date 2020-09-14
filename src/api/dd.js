import fetch from '@/api/fetch'

// 获取钉钉配置信息
function getDDConfig () {
  return fetch({
    url: '/kukacms/self/login/getDingConfig',
    method: 'get'
  })
}

// 配置钉钉信息
const jsApiList = {
  jsApiList : [
    'runtime.info',
    'device.notification.prompt',
    'biz.chat.pickConversation',
    'device.notification.confirm',
    'device.notification.alert',
    'device.notification.prompt',
    'biz.chat.open',
    'biz.util.open',
    'biz.user.get',
    'biz.contact.choose',
    'biz.telephone.call',
    'biz.ding.post',
    'biz.util.uploadImage',
    'biz.navigation.setMenu',
    'biz.navigation.setLeft',
    'biz.util.share',
    'ui.webViewBounce.disable',
    'biz.navigation.setRight'
  ]
}

const jsApiListPC = {
  jsApiList : [
    'runtime.permission.requestAuthCode',
    'runtime.info',
    'device.notification.prompt',
    'biz.chat.pickConversation',
    'device.notification.confirm',
    'device.notification.alert',
    'device.notification.prompt',
    'biz.chat.open',
    'biz.util.open',
    'biz.user.get',
    'biz.contact.choose',
    'biz.telephone.call',
    'biz.ding.post',
    'biz.util.uploadImage',
    'biz.navigation.setMenu',
    'biz.navigation.setLeft',
    'biz.util.share',
    'biz.navigation.setRight'
  ]
}

export function setDDConfig () {
  var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
  if (!is_mobi) {
    return new Promise((resolve, reject) => {
      getDDConfig().then(res => {
        let config = res
        console.log(res)
        const data = Object.assign(config, jsApiListPC)
        DingTalkPC.config(data)
        if (data) {
          resolve(data)
        } else {
          reject('获取用户信息失败')
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      // debugger
      getDDConfig().then((res) => {
        let config = res
        console.log(res)
        const data = Object.assign(config, jsApiList)
        dd.config(data)
        if (data) {
          resolve(data)
        } else {
          reject('获取用户信息失败')
        }
      })
    })
  }
}