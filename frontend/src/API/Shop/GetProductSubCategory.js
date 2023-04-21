import { HttpService } from "Services/HttpService";

export const GetProductSubCategory = async () => await HttpService.get("/subcategory")