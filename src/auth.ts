import jwt from 'jsonwebtoken';

export const getToken = (data: object) => jwt.sign(data, String(process.env.JWT_KEY));

export const createBearer = (id: number) => `Bearer ${getToken({ id })}`;
