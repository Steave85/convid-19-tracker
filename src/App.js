import React from 'react';
import { useStateValue } from './context/InfoProvider';
import Header from './components/Header';
import InfoBox from './components/InfoBox';
import LiveCasesBox from './components/LiveCasesBox';
import Map from './components/Map';
import 'leaflet/dist/leaflet.css'
import './styles/App.css';

function App() {
  const [{countryInfo, center, zoom, case_type}] = useStateValue();

  return (
    <div className="app">
      <div className="app__left">
        <Header />
        <div className="app__stats">
          <InfoBox active={case_type==="cases"} 
                   active_style="infoBox__selected--red" 
                   title='Corona Virus Cases' 
                   caseType="cases" 
                   total={countryInfo.todayCases} 
                   cases={countryInfo.cases} />
          <InfoBox active={case_type==="recovered"} 
                   active_style="infoBox__selected--green" 
                   title='Recovered' 
                   caseType="recovered" 
                   total={countryInfo.todayRecovered} 
                   cases={countryInfo.recovered} />
          <InfoBox active={case_type==="deaths"} 
                   active_style="infoBox__selected--orange" 
                   title='Deaths' 
                   caseType="deaths" 
                   total={countryInfo.todayDeaths} 
                   cases={countryInfo.deaths} />
        </div>
        <div className='app__map'>
          <Map center={center} zoom = {zoom}/>
        </div>
      </div>
      <div className="app__right">
        <LiveCasesBox/>
      </div>
    </div>
  );
}

export default App;
