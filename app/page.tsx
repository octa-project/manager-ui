import Header from './components/Header'
import SideBar from './components/SideBar'

export default function Home() {
  return (
    <body>
      <header>
        <Header></Header>
      </header>
      <main>
        <div className='flex-row lg:flex'>
          <SideBar></SideBar>
        </div>
      </main>
    </body>
  )
}
