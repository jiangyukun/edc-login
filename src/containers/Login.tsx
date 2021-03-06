/**
 * Created by jiangyukun on 2017/11/27.
 */
import React from 'react'

import {isProd} from '../core/env'

interface LoginProps {
  login: (username, password) => void
  loginSuccess: boolean
  getBackPassword: () => void
}

class Login extends React.Component<LoginProps> {
  state = {
    username: '',
    password: ''
  }

  login = () => {
    this.props.login(this.state.username, this.state.password)
  }

  componentWillReceiveProps(nextProps: LoginProps) {
    if (!this.props.loginSuccess && nextProps.loginSuccess) {
      if (isProd()) {
        location.href = '/home'
      } else {
        location.href = '/inline/home'
      }
    }
  }

  render() {
    return (
      <div className="login-page">
        <header>
          <div className="logo">

          </div>
        </header>
        <main className="form">
          <div className="form-item">
            <input placeholder="用户名" className="input" value={this.state.username}
                   onChange={e => this.setState({username: e.target.value})}/>
          </div>
          <div className="form-item">
            <input type="password" placeholder="密码" className="input"
                   value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
          </div>
          <button onClick={this.login} disabled={!this.state.username || !this.state.password}>登录</button>
          <div className="get-back-password" onClick={this.props.getBackPassword}>忘记密码</div>
        </main>

      </div>
    )
  }
}

export default Login
