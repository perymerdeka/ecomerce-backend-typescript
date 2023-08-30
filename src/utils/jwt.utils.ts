import config from 'config';
import  jwt  from 'jsonwebtoken';

const privateKey = config.get<string>("privatekey");
const publicKey = config.get<string>("publickey");

export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, {...(options && options) , algorithm: "RS256"});
    
}

export function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded,
        }

    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "JWT Token Expired",
            decoded: null
        }
    }
}