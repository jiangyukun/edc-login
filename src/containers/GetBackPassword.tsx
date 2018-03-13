/**
 * Created by jiangyukun on 2017/11/27.
 */
import React from 'react'
import Form from 'app-core/form/Form'
import Valid from 'app-core/form/Valid'

import {isEmail} from '../core/common.helper'

interface GetBackPasswordProps {
  getBackToIndex: () => void
  submitResetPassword: (username, email) => void
  submitResetPasswordSuccess: boolean
}

class GetBackPassword extends React.Component<GetBackPasswordProps> {
  state = {
    valid: true,
    username: '',
    email: '',
    submitSuccess: false
  }

  submit = () => {
    this.props.submitResetPassword(this.state.username, this.state.email)
  }

  reSend = () => {
    this.props.submitResetPassword(this.state.username, this.state.email)
  }

  componentWillReceiveProps(nextProps: GetBackPasswordProps) {
    if (!this.props.submitResetPasswordSuccess && nextProps.submitResetPasswordSuccess) {
      this.setState({submitSuccess: true})
    }
  }

  render() {
    return (
      <div className="get-back-password-page">
        <header>找回密码</header>
        {
          !this.state.submitSuccess && (
            <Form onValidChange={(valid) => this.setState({valid})}>
              <div>
                <div className="form-item">
                  <Valid valid={this.state.username != ''}>
                    <input placeholder="用户名" className="input" value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
                  </Valid>
                </div>
                <div className="form-item">
                  <Valid valid={isEmail(this.state.email)}>
                    <input placeholder="邮箱" className="input" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                  </Valid>
                </div>
                <button onClick={this.submit} disabled={!this.state.valid}>提交</button>
                <p className="back-to-login-index" onClick={this.props.getBackToIndex}>返回首页</p>
              </div>
            </Form>
          )
        }
        {
          this.state.submitSuccess && (
            <div>
              <div className="send-reset-password-success">
                <div className="send-to-username">重置密码的邮件已经发送至</div>
                <div className="send-to-email">{this.state.email}</div>
              </div>
              <button onClick={() => this.setState({submitSuccess: false, username: '', email: ''})}>返回</button>
              <p className="resend-email">
                没有收到，<a onClick={this.reSend}>再次发送</a>
              </p>
            </div>
          )
        }

      </div>
    )
  }
}

export default GetBackPassword
