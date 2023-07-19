import LayoutHeader from './layout/header/header'
import Left from './layout/left/left'
import Right from './layout/right/right'
import Center from './layout/center/center'
import styles from './app.less'
import { useCanvas } from './store/canvas'
import { CanvasContext } from './store/context'
function App() {
  const canvas = useCanvas()
  return (
    <CanvasContext.Provider value={canvas}>
      <div className="App">
        <LayoutHeader />
        <div className={styles.main}>
          <Left></Left>
          <Center></Center>
          <Right></Right>
        </div>
      </div>
    </CanvasContext.Provider>
  )
}

export default App
