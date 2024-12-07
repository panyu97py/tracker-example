import { Component, PropsWithChildren } from 'react'
import { Provider } from 'mobx-react'
import {Tracker,presetApplet} from '@trackerjs/applet'
import '@/assets/style/font-oppo-sans/index.less'

Tracker.init({
  presets:[presetApplet({url:'http://localhost:3000/eventData/report',method:'POST'})],
})

import counterStore from './store/counter'

import './app.less'

const store = {
  counterStore
}

class App extends Component<PropsWithChildren> {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
