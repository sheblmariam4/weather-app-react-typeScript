
import {useState,ChangeEvent,useEffect} from 'react'
import {OptionsType,forecastType} from '../types';

type Props={
    setForecast:React.Dispatch<React.SetStateAction<forecastType | null>>
    setClose:React.Dispatch<React.SetStateAction<boolean>>

}
const Search:React.FC<Props>= ({setForecast,setClose}) => {
    //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    const [term, setTerm] = useState<string>('')
    const [options, setOptions] = useState<[]>([])
    const [city, setCity] = useState<OptionsType|null>(null)
    const BASE_URL='http://api.openweathermap.org'
    const getSearchOptions=(v: string)=>{

        fetch(`${BASE_URL}/geo/1.0/direct?q=${v.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
        .then((res)=>res.json())
        .then((data)=>{
            // const forecastData={
            //     ...data.city, 
            //     list:data.list.slice(0,16)
            // }
            setOptions(data)})
        
    }

    const searchFun=(e:ChangeEvent<HTMLInputElement>)=>{
        const value= e.target.value.trim();
        setTerm(value)

        if(value==='') return

        getSearchOptions(value)
    }

    const getForecast=(option:OptionsType)=>{
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${option.lat}&lon=${option.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
         .then(res=>res.json())
         .then(data=>setForecast(data))
    }
    const onSubmit=()=>{
        if(!city)return
        getForecast(city)
        setClose(true)
    }

//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    const onOptionSelect=(option:OptionsType)=>{
        
        setCity(option);
        
              
    }

    useEffect(() => {
      if(city){
        setTerm(city.name)
        setOptions([])
      }
    }, [city])
    
  return (
    <div className='relative my-5 md:my-10 flex'>
        <input type="text" value={term} onChange={searchFun} className=' outline-none px-2 py-1 rounded-1-md border-2 border-white' />
        <ul className='absolute top-9 bg-white ml-1 rounded-md'>
        {term !==''?options.map((option:OptionsType, idx:number)=>(
            <li key={option.name+'-'+idx}>
                <button onClick={()=>onOptionSelect(option)} className='text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer '>

                {option.name}, 
                {option.country}
                </button>
                </li>
        )): ''}

        </ul>
        <button onClick={onSubmit} className=" ease-in-out duration-300 rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer">Go</button>
    </div>
  )
}

export default Search