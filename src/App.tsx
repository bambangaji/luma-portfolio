import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'

export default function App() {
  return (
    <>
      <div className='bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
        <Navbar />
        <main className="max-w-[1600px] mx-auto ">
          <Outlet />
        </main>
      </div>

    </>
  )
}
