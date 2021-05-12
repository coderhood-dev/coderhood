// import { useRouter } from 'next/router'
// import useStore from '@/helpers/store'
import { Children } from 'react'
import dynamic from 'next/dynamic'

import { Header } from '@/components'
import Dom from '@/components/layout/_dom'
import '@/styles/index.css'

let LCanvas = null
if (process.env.NODE_ENV === 'production') {
  LCanvas = dynamic(() => import('@/components/layout/_canvas'), {
    ssr: false,
  })
} else {
  LCanvas = require('@/components/layout/_canvas').default
}

function SplitApp({ canvas, noCanvas, dom }) {
  return (
    <>
      {dom && <Dom dom={dom} />}
      {!noCanvas && <LCanvas>{canvas}</LCanvas>}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  // const router = useRouter()

  let noCanvas = false

  let r3fArr = []
  let compArr = []
  Children.forEach(Component(pageProps).props.children, (child) => {
    if (child.props && child.props.noCanvas) {
      noCanvas = true
    }
    if (child.props && child.props.r3f) {
      r3fArr.push(child)
    } else {
      compArr.push(child)
    }
  })

  // useEffect(() => {
  //   useStore.setState({ router })
  // }, [router])

  return r3fArr.length > 0 || noCanvas ? (
    <SplitApp canvas={r3fArr} dom={compArr} />
  ) : (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
