'use client'

export default function AddToCartBtn({className,setCountAction,count}: {className?: string,count:number,setCountAction:React.Dispatch<React.SetStateAction<number>>}) {

    const inc=(step:number)=>{
        setCountAction(prev => {
            const nexValue=Math.min(10,prev+step)
            return Math.round(nexValue*10)/10;
        })
    }
    const dis=(step:number)=>{
        setCountAction(prev => {
            const nexValue=Math.max(0,prev-step)
            return Math.round(nexValue*10)/10;
        })
    }

    return (
        <div className={`flex items-center w-60  p-2 overflow-hidden rounded-2xl bg-gray-100 ${className || ''}`}>
            <div className={'w-2/5 h-full flex gap-2 items-center text-sm'}>
                <button dir={'ltr'} onClick={()=>inc(0.5)} className={'h-full w-1/2 aspect-square flex justify-center items-center text-white bg-linear-to-r from-red-700 to-red-400 rounded-xl transition-all duration-300  shadow-md hover:shadow-lg cursor-pointer'}>+ 0.5</button>
                <button dir={'ltr'} onClick={()=>inc(0.1)} className={'h-full w-1/2 aspect-square flex justify-center items-center text-white bg-linear-to-r from-red-700 to-red-400 rounded-xl transition-all duration-300  shadow-md hover:shadow-lg cursor-pointer'}>+ 0.1</button>
            </div>
            <input className={'w-1/5  text-center  h-full  '} value={count} type="text" disabled={true}/>
            <div className={'w-2/5 h-full flex gap-2 items-center text-sm'}>
                <button dir={'ltr'} onClick={()=>dis(0.1)} className={' h-full  w-1/2 aspect-square text-red-500  flex justify-center items-center rounded-xl transition-all duration-300 bg-white hover:bg-red-50  shadow-md hover:shadow-lg cursor-pointer'}>- 0.1</button>
                <button dir={'ltr'} onClick={()=>dis(0.5)} className={' h-full  w-1/2 aspect-square text-red-500  flex justify-center items-center rounded-xl transition-all duration-300 bg-white hover:bg-red-50  shadow-md hover:shadow-lg cursor-pointer'}>- 0.5</button>
            </div>
        </div>
    )
}
