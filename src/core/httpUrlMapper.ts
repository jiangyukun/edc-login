/**
 * Created by jiangyukun on 2017/11/1.
 */
import {_bodyParam} from './http'

const mockServer = 'http://36.22.191.29:7001'

function getMockUrl(hash, param?) {
  let mockUrl = mockServer + '/client/' + hash
  if (typeof param == 'string') {
    mockUrl += '?' + param
  }
  if (typeof param == 'object') {
    mockUrl += '?' + _bodyParam(param)
  }
  return mockUrl
}

export default [
  {
    urlToMatch: url => url.indexOf('/user/v1/login') != -1,
    mockUrl: (url, option) => getMockUrl('5a1539f3ef61ae6141ec6590', option.body),
    use: false
  }
]
