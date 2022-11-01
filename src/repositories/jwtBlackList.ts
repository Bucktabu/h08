import {tokenBlackList} from "./db";

export const jwtBlackList = {
    async removeRefreshToken(refreshToken: string) {
        return await tokenBlackList.insertOne({refreshToken})
    }
}