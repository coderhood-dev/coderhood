import Link from 'next/link'

import { capitalize } from '../helpers/string'

const Page = ({ modules }) => {
  console.log('modules', modules)
  return (
    <>
      <div className='p-10'>
        Coderhood
        {modules.map((module) => (
          <Link key={module.url} href={`/academy/${module.name}`}>
            <a>
              <div className='p-4'>{module.name}</div>
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const data = await fetch(`${process.env.REPO_URL}/contents/modulos`)
  const rawModules = await data.json()

  const modules = rawModules.map((m) => {
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
