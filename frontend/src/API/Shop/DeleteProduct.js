import { HttpService } from "Services/HttpService";

export const DeleteProduct = async (id) => await HttpService.delete(`/products/${id}`)