const Module = ({ module }) => {
  return <div>{module}</div>
}

export const getStaticPaths = async () => {
  const data = await fetch(`${process.env.REPO_URL}/contents/modulos`)
  const rawModules = await data.json()

  const paths = rawModules.map(
    // academy name 1-fundamentos-de-programacion -> fundamentos-de-programacion
    (rawModule, i) => `/academy/${rawModule.name.split(/-(.+)/)[1]}`
  )

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: { module: params.module },
  }
}

export default Module
