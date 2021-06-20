import request from "@/utils/request";

export function getQrcode() {
  return request({
    url: "http://localhost:3000/createQrCode",
    method: "post"
  });
}
export function checkScene(data) {
  return request({
    url: "http://localhost:3000/checkScene",
    method: "post",
    data
  });
}
export function saveUserInfo(data) {
  return request({
    url: "http://localhost:3000/saveUserInfo",
    method: "post",
    data
  });
}
