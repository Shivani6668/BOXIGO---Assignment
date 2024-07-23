import SideBar from "./components/Sidebar";
import Home from "./page/Home";

function App() {
  return (
    <>
      <div className='max-w-[1200px] mx-auto flex gap-1 lg:px-0 px-5 justify-center'>
        <SideBar/>
        <Home />
      </div>
    </>
  );
}

export default App;
