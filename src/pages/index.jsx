import Link from 'next/link'
import { getPathContent } from '@/helpers/github'

import { capitalize } from '../helpers/string'

const Page = ({ modules }) => {
  return (
    <>
      <div className='flex flex-col p-10' noCanvas>
        <h1 className='pb-5 text-xl'>Coderhood</h1>
        {modules.map((module) => (
          <Link key={module.url} href={`/academy/${module.name}`}>
            <a>
              <div className='p-4'>{module.title}</div>
            </a>
          </Link>
        ))}
        <h3 className='pt-5'>
          Estamos trabajando en construir la plataforma para Coderhood y
          Coderhood Academy, en los próximos días vas a ver muchos cambios por
          acá.
        </h3>
      </div>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const modulesMetadata = await getPathContent('/contents/modulos')

  console.log('modulesMetadata', modulesMetadata)

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
