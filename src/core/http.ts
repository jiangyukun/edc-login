/**
 * Created by jiangyukun on 2016/11/26.
 */
import {context} from './env'
import httpUrlMapper from './httpUrlMapper'

function handleUrl(url, option) {
  let match = httpUrlMapper.find(m => {
    if (typeof m.urlToMatch == 'function') {
      return m.urlToMatch(url)
    }
    return m.urlToMatch == url
  })
  if (match) {
    if (match instanceof Array) {
      throw new Error('匹配到多个mock url')
    }
    if (match.use) {
      if (typeof match.mockUrl == 'function') {
        return match.mockUrl(url, option)
      }
      return match.mockUrl
    }
  }
  if (process.env.NODE_ENV != 'dev') {
    url = context + url
  }
  return url
}

function preHandle(url, option) {
  url = handleUrl(url, option)
  option = option || {}
  if (!option.type) {
    option.type = 'json'
  }
  if (!option.method) {
    option.method = 'GET'
  }
  const body = option.body

  let contentType = 'application/x-www-form-urlencoded'
  if (option.body && option.type == 'json') {
    contentType = 'application/json;charset=utf-8'
  }

  const request: any = {
    method: option.method,
    credentials: 'include',
    headers: {
      'ajax': 'ajax',
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': contentType
    }
  }

  if (body) {
    if (option.type == 'text') {
      request.body = _bodyParam(body)
    } else {
      request.body = JSON.stringify(body)
    }
  }
  return {url, request}
}

function method(type) {
  return function (url, option?: any) {
    option = option || {}
    option.method = type
    let handleArg = preHandle(url, option)

    return new Promise((resolve, reject) => {
      fetch(handleArg.url, handleArg.request).then(response => {
        if (response.status == 200) {
          return response.json()
        }
        if (response.status == 404) {
          return Promise.resolve({
            status: -1, msg: '未找到指定接口，请联系开发人员'
          })
        }
        return Promise.resolve({
          status: -1, message: 'HTTP: ' + response.status
        })
      }).then(result => {
        try {
          if (result['code'] == 0) {
            resolve(result.data)
          } else {
            reject(result['message'] || ('错误码：' + result['code']))
          }
        } catch (err) {
          throw err
        }
      }).catch(err => reject(err))
    })
  }
}

export let _get = method('GET')
export let _post = method('POST')
export let _put = method('PUT')
export let _patch = method('PATCH')
export let _delete = method('DELETE')
export let _head = method('HEAD')

export function _bodyParam(paramObj) {
  let paramUrl = ''
  let current = 0
  for (let param in paramObj) {
    if (paramObj.hasOwnProperty(param)) {
      if (paramObj[param]) {
        let prefix = ''
        if (current++ == 0) {
          prefix = ''
        } else {
          prefix = '&'
        }
        paramUrl += prefix + param + '=' + paramObj[param]
      }
    }
  }
  return encodeURI(paramUrl)
}
