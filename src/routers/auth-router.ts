import {Request, Response, Router} from "express";
import {authService} from "../domain/auth-service";
import {jwsService} from "../application/jws-service";
import {usersService} from "../domain/user-service";
import {getAuthRouterMiddleware,
        postAuthRouterMiddleware,
        postRegistrationMiddleware,
        postResendingRegistrationEmailMiddleware} from "../middlewares/authRouter-middleware";

export const authRouter = Router({})

authRouter.post('/login',
    postAuthRouterMiddleware,
    async (req: Request, res: Response) => {

        const accessToken = await jwsService.createJWT(req.user!, 10) // поменять потом на 10
        const refreshToken = await jwsService.createJWT(req.user!, 20) // поменять потом на 20
        console.log('---', refreshToken)
        return res.status(200)
            .cookie('refreshToken', refreshToken, {secure: true, httpOnly: true})
            .send({accessToken: accessToken})
    }
)

authRouter.post('/registration',
    ...postRegistrationMiddleware,
    async (req: Request, res: Response) => {

        const result = await authService.createUser(req.body.login, req.body.password, req.body.email)

        return res.status(204).send(result)
    }
)

authRouter.post('/registration-confirmation',
    async (req: Request, res: Response) => {

        const emailConfirmed = await authService.confirmEmail(req.body.code)

        if (!emailConfirmed) {
            return res.status(400).send({errorsMessages: [{ message: 'Bad Request', field: "code" }]})
        }

        return res.status(204).send(emailConfirmed)
    }
)

authRouter.post('/registration-email-resending',
    ...postResendingRegistrationEmailMiddleware,
    async (req: Request, res: Response) => {

        const result = await authService.resendConfirmRegistration(req.body.email)

        if (!result) {
            return res.sendStatus(400)
        }

        return res.status(204).send(result)
    }
)

authRouter.post('/refresh-token', async (req: Request, res: Response) => {

        const tokenInBlackList = await jwsService.giveToken(req.cookies.refreshToken)
        console.log('tokenInBlackList', tokenInBlackList, req.cookies)
        if (tokenInBlackList) {
            return res.sendStatus(401)
        }

        const userInfo = await jwsService.getUserIdByToken(req.cookies.refreshToken)
        console.log('----->', userInfo, req.cookies)
        if (!userInfo) {
            return res.sendStatus(401)
        }

        const user = await usersService.giveUserById(userInfo.userId)

        if (!user) {
            return res.sendStatus(401)
        }

        await jwsService.removeRefreshToken(req.cookies.refreshToken)

        const accessToken = await jwsService.createJWT(user, 10) // поменять потом на 10
        const refreshToken = await jwsService.createJWT(user, 20) // поменять потом на 20

        return res.status(200)
            .cookie('refreshToken', refreshToken, {secure: true, httpOnly: true})
            .send({accessToken: accessToken})
    }
)

authRouter.post('/logout', async (req: Request, res: Response) => {
        const userInfo = await jwsService.getUserIdByToken(req.cookies.refreshToken)

        if (!userInfo) {
            return res.sendStatus(401)
        }

        const user = await usersService.giveUserById(userInfo.userId)

        if (!user) {
            return res.sendStatus(401)
        }

        await jwsService.removeRefreshToken(req.cookies.refreshToken)

        return res.sendStatus(204)
    }
)

authRouter.get('/me',
    getAuthRouterMiddleware,
    async (req: Request, res: Response) => {
        const aboutMe = await usersService.aboutMe(req.user!)

        return res.status(200).send(aboutMe)
    }
)