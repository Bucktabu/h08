import {Request, Response, Router} from "express";
import {authService} from "../domain/auth-service";
import {usersService} from "../domain/user-service";
import {getAuthRouterMiddleware,
        postAuthRouterMiddleware,
        postRegistrationMiddleware,
        postResendingRegistrationEmailMiddleware} from "../middlewares/authRouter-middleware";
import {refreshTokenValidation} from "../middlewares/validation-middleware/refreshToken-validation";
import {createToken} from "../helperFunctions";
import UserAgent from 'user-agents';
import {deviceSecurityService} from "../domain/deviceSecurity-service";
import {v4 as uuidv4} from "uuid";
import {jwsService} from "../application/jws-service";

export const authRouter = Router({})

authRouter.post('/login',
    postAuthRouterMiddleware,
    async (req: Request, res: Response) => {

        const userDevice = new UserAgent().data.deviceCategory
        // в каком сценарии может быть null
        const deviceInfo = await deviceSecurityService.giveUserDevice(req.user!.id, userDevice!)

        let deviceId
        if (!deviceInfo) {
            deviceId = uuidv4()
        } else {
            deviceId = deviceInfo.userDevice.deviceId
        }

        const token = await createToken(deviceId)

        if (!deviceInfo) {
            const tokenInfo = jwsService.giveUserIdByToken(token.refreshToken)
            await deviceSecurityService.createUserDevice(tokenInfo, userDevice!, req.ip)
            // Это не тот случай, когда следует обернуть трайкетчем? или при создании вылезет ошибка
        }

        return res.status(200)
            .cookie('refreshToken', token.refreshToken, {secure: true, httpOnly: true})
            .send({accessToken: token.accessToken})
    }
)

authRouter.post('/registration',
    postRegistrationMiddleware,
    async (req: Request, res: Response) => {

        await authService.createUser(req.body.login, req.body.password, req.body.email)

        return res.sendStatus(204)
    }
)

authRouter.post('/registration-confirmation',
    async (req: Request, res: Response) => {

        const emailConfirmed = await authService.confirmEmail(req.body.code)

        if (!emailConfirmed) {
            return res.status(400).send({errorsMessages: [{ message: 'Bad Request', field: "code" }]})
        }

        return res.sendStatus(204)
    }
)

authRouter.post('/registration-email-resending',
    ...postResendingRegistrationEmailMiddleware,
    async (req: Request, res: Response) => {

        const result = await authService.resendConfirmRegistration(req.body.email)

        if (!result) {
            return res.status(400).json({ errorsMessages: [{ message: 'Wrong email', field: "email" }] }) // поменял send на json и тесты стали проходить
        }

        return res.sendStatus(204)
    }
)

authRouter.post('/refresh-token',
    refreshTokenValidation,
    async (req: Request, res: Response) => {

        const userDevice = new UserAgent().data.deviceCategory
        const deviceInfo = await deviceSecurityService.giveUserDevice(req.user!.id, userDevice!)
        const token = await createToken(deviceInfo!.userDevice.deviceId)

        return res.status(200)
            .cookie('refreshToken', token.refreshToken, {secure: true, httpOnly: true})
            .send({accessToken: token.accessToken})
    }
)

authRouter.post('/logout',
    refreshTokenValidation,
    async (req: Request, res: Response) => {

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