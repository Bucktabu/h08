// import {NextFunction, Request, Response} from "express";
// import {emailConfirmationRepository} from "../../repositories/emailConfirmation-repository";
//
// export const confirmRegistrationValidation = async (req: Request, res: Response, next: NextFunction) => {
//     const emailConfirmation = await emailConfirmationRepository.giveEmailConfirmationByCodeOrId(req.body.code)
//     console.log("emailConfirmation:", emailConfirmation)
//     if (!emailConfirmation) {
//         res.sendStatus(400)
//     }
//
//     if (emailConfirmation!.expirationDate < new Date()) {
//         res.sendStatus(400)
//     }
//
//     if (emailConfirmation!.isConfirmed) {
//         res.sendStatus(400)
//     }
//
//     next()
// }