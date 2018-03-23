/**
 * jiangyukun on 2018/3/13
 */
export const mailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

export function isEmail(str): boolean {
  return mailReg.test(str)
}

export function getParam(url): any {
  let paramStr = url.split('?')[1]
  let params = paramStr.split('&')
  let paramInfo = {}
  params.forEach(p => {
    let keyValue = p.split('=')
    paramInfo[keyValue[0]] = keyValue[1]
  })
  return paramInfo
}