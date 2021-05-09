import React from 'react'
import { getPathContent, getUrlContent } from '@/helpers/github'
import { Lesson } from '@/components'

const Module = ({ module, lessons }) => {
  const [lesson, setLesson] = React.useState(null)

  return (
    <>
      <div className='flex h-full bg-red-300'>
        <div className='w-96 '>
          <h3 onClick={() => setLesson(null)}>{module}</h3>
          {lessons.map((lesson) => (
            <p
              onClick={() => setLesson(lesson)}
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

export default Module
