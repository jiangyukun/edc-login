/**
 * jiangyukun on 2018/3/23.
 */
import React from 'react'
import {observer} from 'mobx-react'
import Form from 'app-core/form/Form'
import Valid from 'app-core/form/Valid'

import {getParam, isEmail} from '../core/common.helper'

interface ResetPasswordProps {
  store: any
  resetPasswordSuccess: boolean
}

@observer
class ResetPassword extends React.Component<ResetPasswordProps> {
  state = {
    valid: true,
    newPassword: '',
    repeatPassword: ''
  }

  submit = () => {
    let param = getParam(window.location.href)
    this.props.store.resetPassword(param.user_name, this.state.newPassword, param.sign)
  }

  componentWillReceiveProps(nextProps: ResetPasswordProps) {
    if (!this.props.resetPasswordSuccess && nextProps.resetPasswordSuccess) {
      alert('重置密码成功！')
    }
  }

  render() {
    return (
      <div className="reset-password">
        <header>重置密码</header>
        <Form onValidChange={(valid) => this.setState({valid})}>
          <div>
            <div className="form-item">
              <Valid valid={this.state.newPassword != ''}>
                <input type="password" placeholder="新密码" className="input"
                       value={this.state.newPassword} onChange={e => this.setState({newPassword: e.target.value})}/>
              </Valid>
            </div>
            <div className="form-item">
              <Valid valid={isEmail(this.state.repeatPassword)}>
                <input type="password" placeholder="确认密码" className="input"
                       value={this.state.repeatPassword}
                       onChange={e => this.setState({repeatPassword: e.target.value})}/>
              </Valid>
            </div>
            <button onClick={this.submit}
              disabled={this.state.newPassword == '' || this.state.newPassword != this.state.repeatPassword}
            >
              提交
            </button>
          </div>
        </Form>
      </div>
    )
  }
}

export default ResetPassword
