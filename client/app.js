import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, green } from '@material-ui/core/colors'

import App from './views/App'

import AppState from './store/app-state'

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: lightBlue,
  },
})

// ReactDOM.hydrate(<App/>, document.getElementById('root'))

const initialState = window.__INITIAL__STATE__ || {}  //eslint-disable-line

const root = document.getElementById('root')

const createApp = (TheApp) => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      // const jssStyles = document.getElementById('jss-server-side');
      // if (jssStyles && jssStyles.parentNode) {
      //   jssStyles.parentNode.removeChild(jssStyles);
      // }
    }

    render() {
      return <TheApp />
    }
  }
  return Main
}

const render = (Component) => {
  // 注意这里闭合标签的写法
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(createApp(App))

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./views/App').default //eslint-disable-line
    // ReactDOM.hydrate(<NextApp/>, document.getElementById('root'))
    render(createApp(NextApp))
  })
}
