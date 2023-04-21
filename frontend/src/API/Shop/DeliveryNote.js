import { HttpService } from "Services/HttpService";

export const DeliveryNote = async (data) => {
  await HttpService.put(`/orders/${data.id}`, { ...data, delivered: true });
};
