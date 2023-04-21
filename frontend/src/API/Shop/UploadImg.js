import { HttpService } from "Services/HttpService";

export const UploadImg = async (img) => {
  const formDataImg = img.map((item) => {
    let formData = new FormData();
    formData.append("image", item);
    return formData;
  });

  let allPromis = [];

  for (const item of formDataImg) {
    allPromis.push(
      await HttpService.post("/upload", item, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  }

  const res = await Promise.all(allPromis);

  const dataImg = res.map((item) => {
    return item.data.filename;
  });

  return dataImg;
};

// const uploadImg = async (img) => {
//   let formData = new FormData();
//   formData.append("image", img);
//   const res = await axios.post("http://localhost:3002/upload", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data"
//     },
//   });
//   console.log(res);
//   return {data : res.data.filename};
// };

// const res = await HttpService.post("/upload", formData, {
//   headers: { "Content-Type": "multipart/form-data" },
// });
// console.log(res.data);
// return res.data.filename;
