import NextHead from 'next/head'

const TITLE = 'Coderhood'
const URL = 'https://coderhood.dev/'
const DESCRIPTION =
  'La comunidad que impulsa el aprendizaje autodidacta y colaborativo'
const author = 'Ema Lorenzo'

export const Head = ({
  title = TITLE,
  url = URL,
  description = DESCRIPTION,
}) => {
  return (
    <>
      <NextHead>
        {/* Recommended Meta Tags */}
        <meta charSet='utf-8' />
        <meta name='language' content='es' />
        <meta httpEquiv='content-type' content='text/html' />
        <meta name='author' content={author} />
        <meta name='designer' content={author} />
        <meta name='publisher' content={author} />

        {/* Search Engine Optimization Meta Tags */}
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta
          name='keywords'
          content='Programacion, Code, Software Engineer, Aprender, Full Stack, Frontend, Backend'
        />
        <meta name='robots' content='index,follow' />
        <meta name='distribution' content='web' />
        {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
        <meta name='og:title' content={title} />
        <meta name='og:type' content='site' />
        <meta name='og:url' content={url} />
        <meta name='og:image' content={'/icons/logo-full.png'} />
        <meta name='og:site_name' content={title} />
        <meta name='og:description' content={description} />

        {/* 
      Twitter Summary card
        documentation: https://dev.twitter.com/cards/getting-started
        Be sure validate your Twitter card markup on the documentation site. */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@onirenaud' />
      </NextHead>
    </>
  )
}
