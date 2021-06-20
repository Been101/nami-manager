import request from "@/utils/request";

export function getBotQrCode() {
  return request({
    url: "http://localhost:3000/bot/generate",
    method: "get"
  });
}
export function getBotNum() {
  return request({
    url: "http://localhost:3000/bot/num",
    method: "get"
  });
}
