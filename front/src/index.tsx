import App from './App'
import { createRoot } from 'react-dom/client'
const rootElement = document.getElementById('root')
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import reduxStore from './store/reduxStore'

// use type assertion
const root = createRoot(rootElement as Element)

root.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
