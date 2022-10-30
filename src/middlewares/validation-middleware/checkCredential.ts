import {Request, Response, NextFunction} from "express";
import {UserDBType} from "../../types/user-type";
import {usersRepository} from "../../repositories/users-repository";
import bcrypt from "bcrypt";

export const checkCredential = async (req: Request, res: Response, next: NextFunction) => {

    const user: UserDBType | null = await usersRepository.giveUserByLoginOrEmail(req.body.login)

    if (!user) {
        return res.status(401).send('Invalid login or user with this login does not exist')
    }

    const passwordEqual = await bcrypt.compare(req.body.password, user!.passwordHash)

    if (!passwordEqual) {
        return res.status(401).send('Wrong password')
    }

    req.user = user
    next()
}