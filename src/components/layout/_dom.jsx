import useStore from '@/helpers/store'
import { Header } from '@/components'
import { useRef } from 'react'

const Dom = ({ dom }) => {
  const ref = useRef(null)
  useStore.setState({ dom: ref })
  return (
    <div
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-y-scroll dom'
      ref={ref}
    >
      <Header />
      {dom}
    </div>
  )
}

export default Dom
