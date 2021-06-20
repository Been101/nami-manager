<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title-top">微信机器人 管理后台</h3>
      <h5 class="title">微信扫码登录</h5>
    </div>
    <div class="qr-code" v-if="qrcode">
      <div class="qr-warp">
        <img :src="qrcode" alt="" />
        <div class="mark" v-if="reload">
          <el-button @click="getQrcode" type="info"
            >二维码已过期，刷新</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQrcode, checkScene } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    return {
      redirect: undefined,
      qrcode: "",
      hasScan: false,
      reload: false,
    };
  },
  mounted() {
    this.getQrcode();
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    getQrcode() {
      getQrcode().then((res) => {
        const { base64Str, scene } = res;
        this.reload = false;
        this.qrcode = base64Str;
        this.checkIsScan(scene);
      });
    },
    checkIsScan(scene) {
      const startTime = Date.now();
      if (this.hasScan) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(() => {
          checkScene({ scene }).then((res) => {
            console.log(res, "---");
            const curTime = Date.now();
            if (curTime - startTime > 60 * 1000) {
              clearInterval(this.timer);
              this.timer = null;
              this.reload = true;
            }
            const { hasScan, token } = res;
            if (hasScan) {
              clearInterval(this.timer);
              this.timer = null;
              this.$store.commit("user/SET_TOKEN", token);
              setToken(token);
              this.$router.push({ path: this.redirect || "/" });
            }
            this.hasScan = hasScan;
          });
        }, 3000);
      }
    },
    handleLogin() {
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || "/" });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/images/loginBg.svg");
  overflow: hidden;

  .title-container {
    position: relative;
    .title-top {
      font-size: 32px;
      color: $bg;
      margin: 100px auto 0;
      text-align: center;
      font-weight: bold;
    }
    .title {
      font-size: 26px;
      color: $bg;
      margin: 10px auto 40px;
      text-align: center;
    }
  }
  .qr-code {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    .qr-warp {
      position: relative;
      width: 200px;
      height: 200px;
      img {
        width: 200px;
        height: 200px;
      }
      .mark {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
