<template>
  <div class="dashboard">
    <div class="dashboard-text">Hello: {{ name }}</div>
    <div class="bot-num-tip">
      <el-alert
        :closable="false"
        v-if="botNumTip"
        :title="botNumTip"
        :type="tipType"
        center
      >
      </el-alert>
    </div>

    <!-- <h5>先设置好后面的配置，再来扫码生成自己的机器人。</h5> -->
    <div>
      <el-button type="primary" @click="genBot" :loading="loading"
        >点击获取二维码，扫码后生成自己的机器人</el-button
      >
    </div>
    <div class="qrcode-wrap">
      <img v-if="botQrCode" class="bot-qrcode" :src="botQrCode" alt="" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getBotQrCode, getBotNum } from "@/api/bot";

export default {
  name: "Dashboard",
  data() {
    return {
      botQrCode: "",
      loading: false,
      botNumTip: "",
      botNum: 0,
    };
  },
  computed: {
    ...mapGetters(["name"]),
    tipType() {
      return this.botNum <= 6
        ? "success"
        : this.botNum <= 10
        ? "warning"
        : "error";
    },
  },
  mounted() {
    this.getBotNum();
  },
  methods: {
    getBotNum() {
      return getBotNum().then((res) => {
        const { botNum } = res.data;
        this.botNum = botNum;
        this.botNumTip = `当前活跃机器人${botNum}个。`;
        return res.data;
      });
    },
    async genBot() {
      this.loading = true;
      this.getBotNum()
        .then(({ botNum }) => {
          this.botNum = botNum;
          if (this.botNum >= 10) {
            this.botNumTip = `已达到最多机器人存活个数（10个），请等别人退出机器人后再重试。`;
          } else {
            return getBotQrCode().then((res) => {
              const { qrcodeImageUrl } = res.data;
              this.botQrCode = qrcodeImageUrl;
              this.loading = false;
              this.botNumTip = `前面已经有${this.botNum}个机器人，最多能同时存在10个机器人。`;
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
  .bot-num-tip {
    margin: 10px 0;
  }
  .qrcode-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .bot-qrcode {
    width: 400px;
    height: 400px;
  }
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
