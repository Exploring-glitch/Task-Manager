import jsonwebtoken from 'jsonwebtoken';

export const signToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"})
}