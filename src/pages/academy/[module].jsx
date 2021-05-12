import { getPathContent, getUrlContent } from '@/helpers/github'
import useStore from '@/helpers/store'
import { Lesson } from '@/components'

const Modules = ({ module, lessons }) => {
  const lesson = useStore((state) => state.lesson)

  return (
    <>
      <div className='flex h-full bg-red-300' noCanvas>
        <div className='w-96 '>
          <h3 onClick={() => useStore.setState({ lesson: null })}>{module}</h3>
          {lessons.map((lesson) => (
            <p
              onClick={() => useStore.setState({ lesson })}
              key={lesson.id}
            >{`Clase ${lesson.id}`}</p>
          ))}
        </div>
        <div className='w-full bg-gray-300'>
          {lesson ? (
            <Lesson key={lesson.id} lesson={lesson} />
          ) : (
            'Selecciona una leccion para ver su contenido, aca deberiamos cargar el README.mdx'
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
