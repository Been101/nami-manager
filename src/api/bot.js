import request from "@/utils/request";

export function getBotQrCode() {
  return request({
    url: "https://www.moluoyingxiong.tech/bot-server/bot/generate",
    method: "get"
  });
}
export function getBotNum() {
  return request({
    url: "https://www.moluoyingxiong.tech/bot-server/bot/num",
    method: "get"
  });
}
