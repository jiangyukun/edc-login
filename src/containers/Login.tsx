/**
 * Created by jiangyukun on 2017/11/27.
 */
import React from 'react'

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
      location.href = 'http://localhost:3081/dev/project'
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
            <input placeholder="用户名" className="input" value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
          </div>
          <div className="form-item">
            <input placeholder="密码" className="input" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
          </div>
          <button onClick={this.login} disabled={!this.state.username || !this.state.password}>登录</button>
          <div className="get-back-password" onClick={this.props.getBackPassword}>找回密码</div>
        </main>

      </div>
    )
  }
}

export default Login
