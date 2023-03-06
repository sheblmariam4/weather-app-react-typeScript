export type OptionsType={
  name:string;
  lon:number;
  lat:number
  country:string
}

export type forecastType ={
    city:{

        name:string;
        country:string;
        sunrise:number;
        sunset:number;
    }
    list:[{
        dt:number
        main:{
            feels_like:number
            grnd_level?:number
            humidity:number
            pressure:number
            sea_level?:number
            temp:number
            temp_kf?:number
            temp_max:number
            temp_min:number
        }
        weather:[{
            
            main: string,
            description: string, 
            icon: string
        }]
        wind:{
            deg: number
            gust: number
            speed: number
        }

        clouds:{all:number}

        pop:number

        visibility:number
    }]
}