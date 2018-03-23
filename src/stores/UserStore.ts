/**
 * Created by jiangyukun on 2017/11/28.
 */
import {observable} from 'mobx'

import {_post} from '../core/http'
import {SYSTEM_LANGUAGE} from '../core/constants'

export default class UserStore {
  @observable loginSuccess = false
  @observable submitResetPasswordSuccess = false

  login = (username, password) => {
    this.loginSuccess = false
    const options = {
      'user_name': username,
      'password': password,
      'local': SYSTEM_LANGUAGE.chinese
    }
    _post(`/user/v1/login`, {body: options, type: 'text'}).then(() => {
      this.loginSuccess = true
    }, err => {
      alert(err)
    })
  }

  submitResetPassword = (username, email) => {
    this.submitResetPasswordSuccess = false

    const options = {
      'user_name': username,
      'user_mail': email,
      'local': SYSTEM_LANGUAGE.chinese
    }
    _post(`/user/v1/forget/password`, {body: options}).then(() => {
      this.submitResetPasswordSuccess = true
    }, err => {
      alert(err)
    })

  }
}
