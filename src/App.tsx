import { AppDispatch } from 'app/store'
import PC from 'devices/PC'
import Phone from 'devices/Phone'
import { selectorWindow, setHeightSize, setWidthSize } from 'features/Window/slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import styles from 'styles/index.module.scss'

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const {windowWidthSize, windowHeightSize} = useSelector(selectorWindow);

  useEffect(() => {
    dispatch(setWidthSize(window.innerWidth));
    dispatch(setHeightSize(window.innerHeight))
  },[window.innerWidth, window.innerHeight])

  return (
    <div className={styles['Main']}>
      {windowWidthSize > 500 ? <PC /> : <Phone />}
    </div>
  )
}

export default App