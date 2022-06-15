import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-q-dynamic-form'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
