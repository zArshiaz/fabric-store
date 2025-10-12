
import Header from "@/Components/Header/Header";
import ProfileTabs from "@/Components/ProfileTabs/ProfileTabs";

function userLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <Header></Header>
            <div className={'container mt-5 sm:mt-28'}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 lg:gap-10">
                    <div
                        className={'col-span-1 '}>
                        <ProfileTabs></ProfileTabs>
                    </div>
                    <div
                        className={'col-span-1 md:col-span-3 p-6 rounded-xl  border-2 border-gray-200 shadow-myShadow shadow-gray-200'}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default userLayout
