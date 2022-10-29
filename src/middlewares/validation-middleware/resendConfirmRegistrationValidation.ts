// import {NextFunction, Request, Response} from "express";
// import {usersRepository} from "../../repositories/users-repository";
// import {emailConfirmationRepository} from "../../repositories/emailConfirmation-repository";
//
// export const resendConfirmRegistrationValidation = async (req: Request, res: Response, next: NextFunction) => {
//     const user = await usersRepository.giveUserByLoginOrEmail(req.body.email)
//
//     if (!user) {
//         res.sendStatus(400)
//     }
//
//     const emailConfirmation = await emailConfirmationRepository.giveEmailConfirmationByCodeOrId(user!.id)
//
//     if (emailConfirmation!.expirationDate < new Date()) {
//         res.sendStatus(400)
//     }
//
//     if (emailConfirmation!.isConfirmed) {
//         res.sendStatus(400)
//     }
//
//     const userAccount = {accountData: user, emailConfirmation: emailConfirmation}
//
//     req.body.account = userAccount
//     next()
// }