import useStore from '@/helpers/store'
import NextHead from 'next/head'
import { useRef } from 'react'

const Head = () => {
  const title = useStore((s) => s.title)
  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  )
}
const Dom = ({ dom }) => {
  const ref = useRef(null)
  useStore.setState({ dom: ref })
  return (
    <div
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom'
      ref={ref}
    >
      <Head />
      {dom}
    </div>
  )
}

export default Dom
