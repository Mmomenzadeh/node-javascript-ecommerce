import { HttpService } from "Services/HttpService";

export const FilterData = async (params) => await HttpService.get(params)