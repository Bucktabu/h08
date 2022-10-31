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

        const accessToken = await jwsService.createJWT(req.user!, 432000) // поменять потом на 10
        const refreshToken = await jwsService.createJWT(req.user!, 432000) // поменять потом на 20

        return res.status(200).cookie('refreshToken', refreshToken, {secure:true, httpOnly: true}).send({accessToken: accessToken}) // должны ли приходить куки если 401 ошибка
    }
)

authRouter.post('/registration',
    ...postRegistrationMiddleware,
    async (req: Request, res: Response) => {

        const result = await authService.createUser(req.body.login, req.body.password, req.body.email)

        return res.status(204).send({result})
    }
)

authRouter.post('/registration-confirmation',
    async (req: Request, res: Response) => {

        const emailConfirmed = await authService.confirmEmail(req.body.code)

        if (!emailConfirmed) {
            return res.status(400).send({errorsMessages: [{ message: 'Bad Request', field: "code" }]})
        }

        return res.status(204).send({emailConfirmed})
    }
)

authRouter.post('/registration-email-resending',
    ...postResendingRegistrationEmailMiddleware,
    async (req: Request, res: Response) => {

        const result = await authService.resendConfirmRegistration(req.body.email)

        if (!result) {
            return res.sendStatus(400)
        }

        return res.status(204).send({result})
    }
)

authRouter.post('/refresh-token', async (req: Request, res: Response) => {
    const user = jwsService.getUserIdByToken(req.cookies.refreshToken)
})

authRouter.get('/me',
    getAuthRouterMiddleware,
    async (req: Request, res: Response) => {
        const aboutMe = await usersService.aboutMe(req.user!)
        console.log('-----> aboutMe: ', aboutMe)

        return res.status(200).send({aboutMe}) // почему в бади не выводит
    }
)