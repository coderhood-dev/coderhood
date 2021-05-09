export const Lesson = ({ lesson }) => {
  const { id, mdx, pdf } = lesson
  const title = `Clase ${id}`
  return (
    <>
      <div className='flex flex-col p-10 bg-gray-300 border-b-4 border-black'>
        <h1 className='pb-5 text-xl'>{title}</h1>
        {pdf && (
          <a
            className='p-5 mr-auto bg-yellow-500 border-2 border-black rounded-full'
            href={pdf}
            download
          >
            Descarga el pdf de la clase
          </a>
        )}
        {mdx && <pre className='pt-10 text-gray-700'>{mdx}</pre>}
      </div>
    </>
  )
}
