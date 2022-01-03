import './styles/index.scss'

import ReactDOM from 'react-dom'
import App from './components/App'

// Router
import { BrowserRouter as Router } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux'
import { store } from './store/index'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root')
)
