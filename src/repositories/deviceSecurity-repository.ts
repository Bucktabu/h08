import {deviceSecurityCollection, usersCollection} from "./db";
import {DeviceSecurityType} from "../types/deviceSecurity-type";

export const deviceSecurityRepository = {
    async createUserDevice(createDevice: DeviceSecurityType) {
        try {
            return await deviceSecurityCollection.insertOne(createDevice)
        } catch (e) {
            return null
        }
    },

    async giveUserDevice(userId: string, userDevice: string): Promise<DeviceSecurityType | null> {
        return await deviceSecurityCollection.findOne({$and: [{userId}, {'userDevice.deviceTitle': userDevice}]})
    }
}