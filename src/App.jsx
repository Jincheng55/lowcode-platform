import LayoutHeader from './layout/header/header'
import Left from './layout/left/left'
import Right from './layout/right/right'
import Center from './layout/center/center'
import styles from './app.less'
import { useCanvas } from './store/canvas'
import { CanvasContext } from './store/context'
import { useEffect, useReducer } from 'react'
function App() {
  const canvas = useCanvas()
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => {
    const unsub = canvas.subscribe(forceUpdate)
    return () => {
      unsub()
    }
  }, [canvas])
  return (
    <CanvasContext.Provider value={canvas}>
      <div className={styles.app}>
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
