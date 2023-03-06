import { getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from '../helpers';
import{forecastType} from '../types'
import { GiSunset ,GiSunrise} from "react-icons/gi";
import { GrFormClose} from "react-icons/gr";
import Tile from './Tile';
type Props={
    data:forecastType 
    setClose:React.Dispatch<React.SetStateAction<boolean>>
    close:boolean
}

const Degree = ({temp}:{temp:number}):JSX.Element => {
  return ( 
    <span>{temp}<sup>o</sup></span>
   );
}
 


const Forecast:React.FC<Props> = ({data, setClose,close}) => {
  const closeTap=()=>{
    if (!data) return
    setClose(!data)
  }
  const today= data.list[0]
  
  
  
  return (
    <div className="w-full md:max-w-[500px] p-2 flex flex-col text-center items-center justify-start md:px-10 lg:p-10 h-full lg:h-[1000px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded absolute top-0">
      <GrFormClose className='absolute left-7 text-2xl cursor-pointer' onClick={()=> closeTap()} />
      <div className='mx-auto w-[300px]'>
        <section className='text-center'>
          <h2 className='text-2xl font-black'>{data.city.name} <span className='font-thin'>{data.city.country}</span> </h2>
          <h1 className='text-4xl font-extrabold'><Degree temp={Math.round(today.main.temp)}/> </h1>
          <p>
            {today.weather[0].description}
            {today.weather[0].main}
            </p>
            <p>
              H:{' '}<Degree temp={Math.ceil(today.main.temp_max)}/> {' '}
              L:{' '}<Degree temp={Math.floor(today.main.temp_min)}/>
            </p>
        </section>
        <section  className='flex md:max-w-[500px] overflow-x-auto mt-4 pb-2 mb-5'>
          {data?.list.slice(0,10).map((item,i)=>(
            <div key={i} className='inline-block text-center w-[50px] flex-shrink-0'>
              <p>{i===0?'Now':new Date(item.dt*1000).getHours()}</p>
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].main} />
              <Degree temp={Math.round(item.main.temp)} />
            </div>
          ))}
        </section>
        <section className='flex justify-between text-zinc-700 flex-wrap'>
          <div className='w-[140px] text-xs font-bold flex flex-col  items-center drop-shadow-lg bg-white/20 backdrop-blur-md rounded  py-4 mb-5'>
          <p>Sunrise</p>  <p className='text-center text-[50px]'><GiSunrise/></p><span className='mt-2'>{getSunTime(data.city.sunrise)}</span>
          </div>
          <div className='w-[140px] text-xs font-bold flex flex-col items-center drop-shadow-lg bg-white/20 backdrop-blur-md rounded  py-4 mb-5'>
          <p>Sunset</p>  <p className='text-center text-[50px]'><GiSunset/></p><span className='mt-2'>{getSunTime(data.city.sunset)}</span>
          </div>
{/* wind */}
<Tile icon='wind' title='Wind' info={`${Math.round(today.wind.speed)} km/h`} description={`${getWindDirection(Math.round(today.wind.deg))}, gusts: ${today.wind.gust.toFixed(1)}km/h`}/>
{/* feels like */}
<Tile icon='feels' title='Feels like' info={<Degree temp={today?.main?.feels_like}/> } description={`Feels ${Math.round(today.main.feels_like)< Math.round(today.main.temp)?'colder':'warmer'}`}/>
{/* humidity */}
<Tile icon='humidity' title='Humidity' info={`${today.main.humidity} `} description={`${getHumidityValue(today.main.humidity)}`}/>
{/* pop */}
<Tile icon='pop' title='Precipitation' info={`${Math.round(today.pop * 1000)} %`} description={`${getPop(today.pop)}, clouds at${today.clouds.all}%`}/>
{/* pressure */}
<Tile icon='pressure' title='Pressure' info={`${Math.round(today.main.pressure)} hPa`} description={`${Math.round(today.main.pressure)<1013?'Lower':'Higher'} than standard`}/>
{/* visiblty */}
<Tile icon='visibility' title='visibility' info={`${(today.visibility/1000).toFixed()} km`} description={`${getVisibilityValue(today.visibility)}`}/>
        </section>
      </div>
    </div>
  )
}

export default Forecast
