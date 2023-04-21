import { HttpService } from "Services/HttpService";

export const  GetProductCategory = async () => await HttpService.get("/category")