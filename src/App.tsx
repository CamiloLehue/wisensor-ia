
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {

  return (
    <div className="text-gray-200 font-montserrat  flex">
      <Sidebar />
      <div className="flex-1 flex flex-col  ml-16">
        <Header />
        <MainContent/>
      </div>
    </div>
  );
}

export default App;