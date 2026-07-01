
function ForgotPasswordLayout({children }:{children:React.ReactNode}) {

    return (
        <div className={'flex h-screen w-screen items-center justify-center'}>
            <div className={' bg-white rounded-2xl shadow-2xl overflow-hidden w-[380px]'}>
                {/*header*/}
                <div className="bg-red-700 text-white p-5 text-center">
                    <h1 className="text-2xl font-bold mb-2">بازیابی رمز عبور</h1>
                </div>
                <div className={'p-4'}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordLayout
