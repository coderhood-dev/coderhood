import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion, AnimatePresence } from 'framer-motion'
import { Head } from '@/components'
import useStore from '@/helpers/store'

export const Header = () => {
  const title = useStore((s) => s.title)
  const { asPath } = useRouter()
  return (
    <>
      <Head title={title} />
      <header className='flex items-center justify-between h-20 pl-4 pr-8'>
        <Link href='/'>
          <a className='flex'>
            <Image
              src='/img/logo-full.png'
              alt='Coderhood logo'
              height={52.5}
              width={240}
              quality={65}
            />
          </a>
        </Link>
        <nav className='pl-10'>
          <ul>
            <AnimatePresence>
              {asPath !== '/academy' && (
                <motion.li
                  className='bg-yellow-500 rounded-full hover:ring-4 ring-yellow-500 ring-opacity-50'
                  initial={{ x: 200 }}
                  animate={{ x: 0 }}
                  exit={{ x: 200 }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                  }}
                >
                  <Link href='/academy'>
                    <a className='font-bold'>
                      <p className='p-4 text-white'>🎓 Academy</p>
                    </a>
                  </Link>
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
        </nav>
      </header>
    </>
  )
}
