import { useEffect } from 'react'

import './App.css'
import { useAppDispatch, useAppSelector } from './hooks'
import { stationSelector } from './features/store/measurements'
import { fetchWeatherData } from './features/store/thunk'

const  App = () =>  {
  const stationsData = useAppSelector(stationSelector())
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!stationsData.stations) {
      dispatch(fetchWeatherData('someURL'));
    }
  },[]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Statistics</h1>

      {stationsData.higherTemp ? (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Highest Temperature</h2>
          <p>Station: {stationsData.higherTemp.name}</p>
          <p>Temperature: {stationsData.higherTemp.temp}°C</p>
        </div>
      ) : (
        <p>Loading highest temperature...</p>
      )}

      {stationsData.biggestDiff ? (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Biggest Temperature Difference</h2>
          <p>Station: {stationsData.biggestDiff.name}</p>
          <p>Difference: {stationsData.biggestDiff.diff.toFixed(2)}°C</p>
        </div>
      ) : (
        <p>Loading biggest temperature difference...</p>
      )}

      {stationsData.avgTemp !== null ? (
        <div>
          <h2 className="text-xl font-semibold">Average Temperature</h2>
          <p>Average Temperature: {stationsData.avgTemp.toFixed(2)}°C</p>
        </div>
      ) : (
        <p>Loading average temperature...</p>
      )}

      {stationsData.northSeaStation !== null ? (
         <div>
         <h2 className="text-xl font-semibold">North Sea Station</h2>
         <p>Station Name: {stationsData.northSeaStation}°C</p>
       </div>
      ): (
        <p>Loading average station...</p>
      )}
    </div>
  );
};

export default App
