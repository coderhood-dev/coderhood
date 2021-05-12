import Link from 'next/link'

const Home = ({ modules }) => {
  return (
    <>
      <div className='h-full'>
        <section className='flex items-center h-full p-20 pt-0'>
          <div className='flex flex-col max-w-4xl gap-y-4'>
            <h1 className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600'>
              Compartimos conocimiento,
              <br /> Aprendemos juntos
            </h1>
            <h3 className='text-gray-600'>
              Somos una comunidad de personas en tech que aprende y comparte
              conocimiento. No sabemos todo, el mundo tech es enorme y lleva una
              vida de aprendizaje, pero mientras vamos aprendiendo creemos que
              compartido el viaje es mejor. Por eso incentivamos siempre a que
              una vez se aprenda algo, le que quiera pueda compartirlo y asi
              crecer juntos.
              <br />
              Coderhood es y siempre va a ser gratis, tanto la comunidad, como
              las clases y cualquiera de sus espacios.
            </h3>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
