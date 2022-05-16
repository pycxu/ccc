import './home.scss';
import Sentiment from '../charts/Sentiment';
import Income from '../charts/Income';
import Unemployment from '../charts/Unemployment';
import Facility from '../charts/Facility';

const Home = () => {

    return (
        <div id='home' className='home'>
          <div className='row'>
            <Sentiment />
            <Income/>
          </div>
          <div className='row'>
            <Unemployment/>
            <Facility/>
          </div>
        </div>  
    );
}

export default Home;