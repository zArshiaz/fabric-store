
import Header from "@/Components/Header/Header";
import ProfileTabs from "@/Components/ProfileTabs/ProfileTabs";

function userLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <Header></Header>
            <div className={'container mt-3 sm:mt-28'}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 lg:gap-10">
                    <div
                        className={'col-span-1 '}>
                        <ProfileTabs></ProfileTabs>
                    </div>
                    <div
                        className={'col-span-1 md:col-span-3 p-3 sm:p-6 mb-3 rounded-xl  border-2 border-gray-200 shadow-myShadow shadow-gray-200'}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default userLayout
