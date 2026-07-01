const regex = {
    password: /^[\w\W]{8,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    phoneNumber: /^09[0-9]{9}$/,
}
export default regex