import {ReactNode} from "react";

function TitlePage({title,children}:{title:string,children?:ReactNode}) {


    return (
        <div
            className="bg-white rounded-xl shadow p-3 mb-3">
            <div className="flex items-center justify-between ">
                <div className="">
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                        {title}
                    </h1>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default TitlePage

