import React from 'react'

export const Lesson = ({ lesson }) => {
  const { id, mdx, pdf } = lesson
  const title = `Clase ${id}`
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full min-h-screen p-10 rounded-lg'>
        <h1 className='mb-10 text-2xl text-gray-700'>{title}</h1>
        {pdf ? (
          <a
            className='bg-yellow-500 rounded-full hover:ring-4 ring-yellow-500 ring-opacity-50'
            href={pdf}
            download
          >
            <p className='p-4 font-bold text-white'>
              ⚡️ Descarga el pdf de la clase
            </p>
          </a>
        ) : (
          <p className='text-xl text-gray-700'>Próximamente</p>
        )}
        {/* {mdx && <pre className='pt-10 text-gray-700'>{mdx}</pre>} */}
      </div>
    </>
  )
}
