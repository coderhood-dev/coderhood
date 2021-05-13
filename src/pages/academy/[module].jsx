import { getPathContent, getUrlContent } from '@/helpers/github'
import useStore from '@/helpers/store'
import { Lesson } from '@/components'

const Modules = ({ module, lessons }) => {
  const lesson = useStore((state) => state.lesson)
  useStore.setState({ title: module })
  return (
    <>
      <div className='flex h-full bg-white'>
        <div className='w-1/5 py-10'>
          <a className='cursor-pointer'>
            <h3
              className='pb-10 pl-10 pr-4 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-900'
              onClick={() => useStore.setState({ lesson: null })}
            >
              {module}
            </h3>
          </a>
          {lessons.map((l) => (
            <a
              className='cursor-pointer'
              onClick={() => useStore.setState({ lesson: l })}
              key={l.id}
            >
              <p
                className={`px-10 py-1 my-1 text-lg hover:bg-gray-100 ${
                  lesson && l.id === lesson.id
                    ? 'text-yellow-500'
                    : 'text-gray-700'
                }`}
              >{`Clase ${l.id}`}</p>
            </a>
          ))}
        </div>
        <div className='w-4/5 h-full shadow-2xl'>
          {lesson ? (
            <Lesson key={lesson.id} lesson={lesson} />
          ) : (
            <div className='flex items-center justify-center h-full'>
              <p className='text-center text-gray-700'>
                Selecciona una leccion para ver su contenido.
                <br /> En una futura update aca se va a cargar el README.md del
                módulo.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const modulesMetadata = await getPathContent('/contents/modulos')

  const paths = modulesMetadata.map(
    (m) => `/academy/${m.name.split(/-(.+)/)[1]}`
  )

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params: { module } }) => {
  const modulesMetadata = await getPathContent('/contents/modulos')

  const moduleMetadata = modulesMetadata.find((m) => m.name.includes(module))

  const moduleFolder = await getUrlContent(moduleMetadata.url)

  let lessons = []
  for (const file of moduleFolder) {
    const lastLesson = lessons[lessons.length - 1]
    const id = file.name.split('-')[0]

    const lesson = { id }
    if (file.name.includes('.mdx')) {
      lesson.mdx = await fetch(file.download_url).then((data) => data.text())
    }
    if (file.name.includes('.pdf')) {
      lesson.pdf = file.download_url
    }

    if (!lastLesson || (lastLesson && lastLesson.id < id)) {
      lessons.push(lesson)
    } else {
      const updatedLesson = { ...lastLesson, ...lesson }
      lessons[lessons.length - 1] = updatedLesson
    }
  }

  return {
    props: { module, lessons },
  }
}

export default Modules
