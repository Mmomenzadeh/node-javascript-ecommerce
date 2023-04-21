import { HttpService } from "Services/HttpService";

export const PostOrder = async (data) => HttpService.post(`/orders` , data)