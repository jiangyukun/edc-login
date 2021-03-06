/**
 * jiangyukun on 2018/3/23.
 */
import React from 'react'
import {observer} from 'mobx-react'

import Login from './Login'
import GetBackPassword from './GetBackPassword'

interface MainPanelProps {
  store: any
}

@observer
class MainPanel extends React.Component<MainPanelProps> {
  state = {
    loginPage: true
  }

  render() {
    const store = this.props.store

    return (
      <div className="edc-login-app">
        {
          this.state.loginPage && (
            <Login
              login={store.login}
              loginSuccess={store.loginSuccess}
              getBackPassword={() => this.setState({loginPage: false})}
            />
          )
        }
        {
          !this.state.loginPage && (
            <GetBackPassword
              getBackToIndex={() => this.setState({loginPage: true})}
              submitResetPassword={store.submitResetPassword}
              submitResetPasswordSuccess={store.submitResetPasswordSuccess}
            />
          )
        }
        <footer className="page-footer">
          <p>中文 丨 ENGLISH </p>
          <p>©2018 望吉健康科技版权所有 | 浙ICP备xxxxxxx号</p>
        </footer>
      </div>
    )
  }
}

export default MainPanel
