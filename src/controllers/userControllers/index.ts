
import RegisterUserController from "./RegisterUserController";
import AuthenticateUserController from "./AuthenticateUserController";

export default () => { 
  const register = new RegisterUserController().handle;
  const login = new AuthenticateUserController().handle;

  return { register, login };
};