import {NextFunction, Request, Response} from "express";

import {jwsService} from "../../application/jws-service";
import {usersService} from "../../domain/user-service";

export const authentication = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        return res.sendStatus(401)
    }

    const accessToken = req.headers.authorization.split(' ')[1]

    const userId = await jwsService.getUserIdByToken(accessToken)

    if (!userId) {
        return res.sendStatus(401)
    }

    const user: any = await usersService.giveUserById(userId)

    if (!user) {
        return res.sendStatus(401)
    }

    req.user = user
    res.locals = user
    next()
}