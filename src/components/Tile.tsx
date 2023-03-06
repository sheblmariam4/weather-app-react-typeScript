import { WiDayWindy,WiHumidity,WiBarometer } from "react-icons/wi";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { MdVisibility,MdOutlineWaterDrop } from "react-icons/md";

type Props={
  title:string
  info:string|JSX.Element
  description:string
  icon:'wind'|'pop'|'pressure'|'visibility'|'humidity'|'feels'
}

const icons={
  wind: <WiDayWindy/>,
  feels:<FaThermometerThreeQuarters/>,
  humidity:<WiHumidity/>,
  visibility:<MdVisibility/>,
  pressure:<WiBarometer/>,
  pop:<MdOutlineWaterDrop/>
}
const Tile = ({icon,title,info,description}:Props):JSX.Element => {
const Icon=icons[icon]


  return (
    <article className="w-[140px] h-[130px] text-zinc-700 bg-white/20 backdrop-blur-lg rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between">
      <div className="flex  text-sm font-bold items-center">
        <p>{Icon}</p> <h4 className="ml-1">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg self-start">{info}</h3>
      <p className="text-xs font-bold self-start ">{description}</p>
    </article>
  )
}

export default Tile
