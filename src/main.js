import './styles/main.less'
import './styles/reset.less'
import './styles/scroll.less'
import './scripts/colorScheme'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
