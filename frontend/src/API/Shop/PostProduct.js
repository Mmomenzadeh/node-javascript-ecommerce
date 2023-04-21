import { HttpService } from "Services/HttpService";

export const PostProduct = async (data) => await HttpService.post("/products",data)