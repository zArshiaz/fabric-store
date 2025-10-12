import React from 'react'
import {CiStar} from "react-icons/ci";
import {BiSolidStar, BiSolidStarHalf, BiStar} from "react-icons/bi";

function PrintStarts({count=0,className}: { count: number ,className?:string }) {
    const stars = Math.floor(count)
    const halfStar = count - stars >= 0.5 ? 1 : 0;
    const freeStars = 5 - stars - halfStar;

    return (
        <div className={` flex text-yellow-600 pb-1 lg:text-xl ${className}`}>
            {stars!==0 && Array.from({length:stars}).map((item, i) => (
                <BiSolidStar key={7+i} />
            ))}
            {halfStar===1 &&   <BiSolidStarHalf  className={'rotate-y-180'}/>}
            {freeStars!==0 && Array.from({length:freeStars}).map((item, i) => (
                <BiStar key={i}/>
            ))}
        </div>
    )
}

export default PrintStarts
