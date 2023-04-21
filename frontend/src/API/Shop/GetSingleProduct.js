import { HttpService } from "Services/HttpService";

export const GetSingleProduct = async (id)=> await HttpService.get(`/products/${id}`)