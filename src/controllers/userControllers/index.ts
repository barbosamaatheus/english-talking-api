
import UserRegisterController from "./UserRegisterController"
import UserAuthenticateController from './UserAuthenticateController'

export default () => { 
  const register = new UserRegisterController().handle
  const authenticate = new UserAuthenticateController().handle

  return { register, authenticate }
}