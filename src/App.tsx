
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {

  return (
    <div className="text-gray-200 overflow-hidden font-montserrat h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen ml-16">
        <Header />
        <MainContent/>
      </div>
    </div>
  );
}

export default App;