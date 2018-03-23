/**
 * jiangyukun on 2018/3/23.
 */
import React from 'react'
import Form from 'app-core/form/Form'
import Valid from 'app-core/form/Valid'

import {isEmail} from '../core/common.helper'

interface ResetPasswordProps {

}

class ResetPassword extends React.Component<ResetPasswordProps> {
  state = {
    valid: true,
    newPassword: '',
    repeatPassword: ''
  }

  submit = () => {

  }

  render() {
    return (
      <div className="reset-password">
        <header>重置密码</header>
        <Form onValidChange={(valid) => this.setState({valid})}>
          <div>
            <div className="form-item">
              <Valid valid={this.state.newPassword != ''}>
                <input placeholder="新密码" className="input"
                       value={this.state.newPassword} onChange={e => this.setState({newPassword: e.target.value})}/>
              </Valid>
            </div>
            <div className="form-item">
              <Valid valid={isEmail(this.state.repeatPassword)}>
                <input placeholder="确认密码" className="input"
                       value={this.state.repeatPassword}
                       onChange={e => this.setState({repeatPassword: e.target.value})}/>
              </Valid>
            </div>
            <button onClick={this.submit} disabled={!this.state.valid}>提交</button>
          </div>
        </Form>
      </div>
    )
  }
}

export default ResetPassword
