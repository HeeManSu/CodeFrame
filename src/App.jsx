import './App.css'
import Preview from './components/Preview'
import Toolbar from "./components/Toolbar";

function App() {

  return (
    <>

      <div className='pt-[100px]'>
        <Preview />
      </div>


      <div className=''>
        <Toolbar />
      </div>


      <div className='flex items-center text-[18px] pt-[18px] justify-center'>
        Made with ❤️ by Himanshu Sharma
      </div>





    </>

  )
}

export default App
