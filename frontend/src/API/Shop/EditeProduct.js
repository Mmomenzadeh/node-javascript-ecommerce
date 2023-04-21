import { HttpService } from "Services/HttpService";

export const EditeProductService = async ( data) =>
  await HttpService.put(`/products/${data.id}`, { ...data, id: data.id });
