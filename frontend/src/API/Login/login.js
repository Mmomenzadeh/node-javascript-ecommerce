
import { HttpService } from "Services/HttpService";

export const AuthService = async (data) => HttpService.post('/auth/login' , data )