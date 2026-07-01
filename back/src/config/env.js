function required(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env variable: ${name}`);
    }
    return value;
}

export const ENV = {
    PORT: process.env.PORT || 4000,
    MONGODB_URI: required("MONGODB_URI"),
    CLIENT_ORIGINS: required("CLIENT_ORIGINS")
        .split(",")
        .map(o => o.trim())
        .filter(Boolean),
    JWT_SECRET: required("JWT_SECRET"),
};
