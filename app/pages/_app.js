import '../styles/globals.css'
import Link from 'next/link'
import logo from '../assets/logo.svg'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 border-b border-b-[#e1e7f1]' >
        <Link href="/" >
          <img src={logo.src} alt="logo" className='w-28 object-contain' />
        </Link>
        <Link href="/createPost" className='font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md' >
          Create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]' >
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
