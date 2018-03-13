/**
 * jiangyukun on 2018/3/13
 */
export const mailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

export function isEmail(str): boolean {
  return mailReg.test(str)
}