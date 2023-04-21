import { HttpService } from "Services/HttpService";

export const EditeStockService = (data) => {
  let allPromises = [];
  for (const item of data) {
    allPromises.push(
      HttpService.patch(`/products/${item.id}`, {
        ...item,
        quantity: item.quantity,
        price: item.price,
        id: item.id,
      })
    );
  }

  return Promise.all(allPromises);
};
