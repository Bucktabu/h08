import {deviceSecurityRepository} from "../repositories/deviceSecurity-repository";
import {DeviceSecurityType} from "../types/deviceSecurity-type";
import {v4 as uuidv4} from "uuid";

export const deviceSecurityService = {
    async giveUserDevice(userId: string, userDevice: string): Promise<DeviceSecurityType | null> {
        return deviceSecurityRepository.giveUserDevice(userId, userDevice)
    },

    async createUserDevice(tokenInfo: any, userDevice: string, ipAddress: string) {
        const createDevice: DeviceSecurityType = {
            userId: tokenInfo.id,
            userDevice: {
                deviceTitle: userDevice,
                deviceId: uuidv4(),
                ipAddress,
                iat: tokenInfo.iat,
                end: tokenInfo.end
            }
        }

        const createdDevice = deviceSecurityRepository.createUserDevice(createDevice)

        if (!createdDevice) {
            return null
        }

        return deviceSecurityRepository.giveUserDevice(createDevice.userId, createDevice.userDevice.deviceTitle)
    }


}