import './App.scss';
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import Home from './components/home/Home';
import UnemploymentBiaxial from './components/charts/UnemploymentBiaxial';
import IncomeBiaxial from './components/charts/IncomeBiaxial';
import FacilityBiaxial from './components/charts/FacilityBiaxial';

const App = () => {
  return (
    <div className="app">
      <Navbar/>
      <Menu/>
      <div className='sections'>
        <Home />
        <IncomeBiaxial/>
        <UnemploymentBiaxial />
        <FacilityBiaxial/>
      </div>
    </div>
  );
}

export default App;
