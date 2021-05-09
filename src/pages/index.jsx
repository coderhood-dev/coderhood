import Link from 'next/link'
import { getPathContent } from '@/helpers/github'

import { capitalize } from '../helpers/string'

const Page = ({ modules }) => {
  return (
    <>
      <div className='p-10'>
        Coderhood
        {modules.map((module) => (
          <Link key={module.url} href={`/academy/${module.name}`}>
            <a>
              <div className='p-4'>{module.title}</div>
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const modulesMetadata = await getPathContent('/contents/modulos')

  const modules = modulesMetadata.map((m) => {
    const name = m.name.split(/-(.+)/)[1]
    const words = name.split('-')
    const [fistWord, ...others] = words
    const title = [capitalize(fistWord), ...others].join(' ')
    const url = m.url

    return { name, title, url }
  })

  return {
    props: { modules },
  }
}
