import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/vue-admin-template/user/login",
    method: "post",
    data
  });
}

export function getInfo() {
  return request({
    url: "https://www.moluoyingxiong.tech/bot-server/user/info",
    method: "get"
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post"
  });
}
