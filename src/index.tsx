/**
 * Created by jiangyukun on 2017/11/27.
 */
import React from 'react'
import {render} from 'react-dom'

import './css/index.scss'
import Root from './containers/Root'
import UserStore from './stores/UserStore'

let store = new UserStore()
render(<Root store={store}/>, document.getElementById('root'))
