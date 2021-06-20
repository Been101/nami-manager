import request from "@/utils/request";

export function getQrcode() {
  return request({
    url: "http://www.moluoyingxiong.tech/bot-server/createQrCode",
    method: "post"
  });
}
export function checkScene(data) {
  return request({
    url: "http://www.moluoyingxiong.tech/bot-server/checkScene",
    method: "post",
    data
  });
}
export function saveUserInfo(data) {
  return request({
    url: "http://www.moluoyingxiong.tech/bot-server/saveUserInfo",
    method: "post",
    data
  });
}
