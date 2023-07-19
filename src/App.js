import LayoutHeader from './layout/header/header'
import Left from './layout/left/left'
import Right from './layout/right/right'
import Center from './layout/center/center'
import styles from './app.less'
function App() {
  return (
    <div className="App">
      <LayoutHeader />
      <div className={styles.main}>
        <Left></Left>
        <Center></Center>
        <Right></Right>
      </div>
    </div>
  )
}

export default App
