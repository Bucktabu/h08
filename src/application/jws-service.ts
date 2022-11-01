import jwt from 'jsonwebtoken'
import {UserDBType} from "../types/user-type";
import {settings} from "../settings";
import {jwtBlackList} from "../repositories/jwtBlackList";

export const jwsService = {
    async createJWT(user: UserDBType, timeToExpired: number) {
        return jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: `${timeToExpired}s`})
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = await jwt.verify(token, settings.JWT_SECRET)
            return result
        } catch (error) {
            return null
        }
    },

    async removeRefreshToken(refreshToken: string) {
        return jwtBlackList.removeRefreshToken(refreshToken)
    }
}