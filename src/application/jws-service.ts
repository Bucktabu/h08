import jwt from 'jsonwebtoken'
import {UserDBType} from "../types/user-type";
import {settings} from "../settings";

export const jwsService = {
    async createJWT(user: UserDBType, timeToeExpired: number) {
        return jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: `${timeToeExpired}s`})
    },

    async checkJWT(refreshToken: string) {
        return jwt.verify(refreshToken, settings.JWT_SECRET)
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            console.log('-----> result: ', result)
            return result.userId
        } catch (error) {
            return null
        }
    }
}