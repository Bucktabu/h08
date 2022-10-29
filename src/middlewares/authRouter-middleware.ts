import {authentication} from "./validation-middleware/authentication";
import {inputValidation} from "./validation-middleware/input-validation";
import {userEmailValidation,
        userLoginValidation,
        userPasswordValidation} from "./validation-middleware/userRouter-validation";
import {loginOrEmailExistValidation} from "./validation-middleware/loginOrEmailExistValidation";

export const getAuthRouterMiddleware = [authentication]
export const postAuthRouterMiddleware = [userLoginValidation, userPasswordValidation, inputValidation]
export const postRegistrationMiddleware = [userLoginValidation, userPasswordValidation, userEmailValidation, inputValidation, loginOrEmailExistValidation]
export const postResendingRegistrationEmailMiddleware = [userEmailValidation, inputValidation]