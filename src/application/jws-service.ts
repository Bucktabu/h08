import jwt from 'jsonwebtoken'
import {UserDBType} from "../types/user-type";
import {settings} from "../settings";

export const jwsService = {
    async createJWT(user: UserDBType) {
        return jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '720h'})
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    }
}