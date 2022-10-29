import {emailConfirmCollection, usersCollection} from "./db";
import {EmailConfirmationType} from "../types/email-confirmation-type";
import {emailsManager} from "../managers/email-manager";

export const emailConfirmationRepository = {
    async createEmailConfirmation(emailConfirmation: EmailConfirmationType) {
        try {
            return await emailConfirmCollection.insertOne(emailConfirmation)
        } catch (e) {
            return null
        }
    },

    async giveEmailConfirmationByCodeOrId(codeOrId: string): Promise<EmailConfirmationType | null> {
        return await emailConfirmCollection
            .findOne({$or: [{confirmationCode: codeOrId}, {id: codeOrId}]})
    },

    async updateConfirmation(code: string) {
        let result = await emailConfirmCollection
            .updateOne({confirmationCode: code}, {$set: {isConfirmed: true}})

        return result.modifiedCount === 1
    },

    async deleteAllEmailConfirmation(): Promise<boolean> {
        try {
            await emailConfirmCollection.deleteMany({})
            return true
        } catch (e) {
            console.log('blogsCollection => deleteAllBlogs =>', e)
            return false
        }
    }
}