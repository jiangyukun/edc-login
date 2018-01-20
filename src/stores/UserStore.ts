/**
 * Created by jiangyukun on 2017/11/28.
 */
import {observable} from 'mobx'

import {_post} from '../core/http'

export default class UserStore {
  @observable loginSuccess = false
  @observable submitResetPasswordSuccess = false

  login = (username, password) => {
    this.loginSuccess = false
    const options = {
      "user_name": username,
      "password": password,
      "local": '1'
    }
    _post(`/user/v1/login`, {body: options, type: 'text'}).then(() => {
      this.loginSuccess = true
    })
  }

  submitResetPassword = (username, email) => {
    this.submitResetPasswordSuccess = false

    const options = {
      "user_name": username,
      "password": email,
      "local": '1'
    }
    _post(`/user/v1/password/reset`, {body: options}).then(() => {
      this.submitResetPasswordSuccess = true
    })

  }
}
