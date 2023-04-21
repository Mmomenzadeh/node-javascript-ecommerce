import { HttpService } from "Services/HttpService";

export const  SearchProductAPI = async (params) => await HttpService.get(params)