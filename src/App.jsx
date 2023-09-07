import './App.css'
import Preview from './components/Preview'
import Toolbar from "./components/Toolbar";
import { AiOutlineGithub } from "react-icons/ai"

function App() {

  return (
    <>
      <GitHubStarButton />
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
const GitHubStarButton = () => {
  return (
    <div className='bg-white w-fit text-[18px] flex items-center gap-4 rounded-lg text-black px-4 py-2 mt-5 ml-auto mr-6  '>
      <a target='_blank' href="https://github.com/cybrog-x/CodeFrame">Star on Github</a>
      <AiOutlineGithub />
    </div>
  );
};
