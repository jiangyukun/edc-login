/**
 * Created by jiangyukun on 2017/11/27.
 */
import React from 'react'
import {observer} from 'mobx-react'
import {BrowserRouter, Route} from 'react-router-dom'

import MainPanel from './MainPanel'

import {getPathPrefix} from '../core/env'
import ResetPassword from './ResetPassword'

interface RootProps {
  store: any
}

@observer
class Root extends React.Component<RootProps> {
  render() {
    const store = this.props.store
    const resetPasswordSuccess = this.props.store.resetPasswordSuccess

    return (
      <BrowserRouter>
        <div>
          <Route path={getPathPrefix() + 'resetPassword'}
                 component={() => <ResetPassword store={store} resetPasswordSuccess={resetPasswordSuccess}/>}
          />
          <Route path={getPathPrefix() + 'login'} component={() => <MainPanel store={store}/>}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default Root
