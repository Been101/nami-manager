<template>
  <div class="app-container">
    <el-form ref="form" :model="config" label-width="140px">
      <el-form-item label="自动通过好友">
        <el-switch v-model="config.autoPass" />
      </el-form-item>
      <el-form-item label="添加好友验证">
        <el-tag
          v-for="tag in config.dynamicTags"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="removeKeyword(dynamicTags, tag)"
          class="tag"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput"
        >
          + 添加关键词</el-button
        >
      </el-form-item>
      <el-form-item label="默认智能机器人">
        <el-radio-group v-model="config.chatKey">
          <el-radio label="tianxingKey">天行智能机器人</el-radio>
          <el-radio disabled label="tulingKey">图灵机器人</el-radio>
          <el-radio disabled label="tengxunKey">腾讯闲聊机器人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="智能机器人回复">
        <el-switch v-model="config.reply" />
      </el-form-item>
      <el-form-item label="新加好友自动回复">
        <el-tag
          v-for="tag in multipleSelection"
          :key="tag.id"
          closable
          type="success"
          @close="removeKeyword(multipleSelection, tag)"
          >{{ tag.name }}
        </el-tag>
        <el-button
          class="select-material"
          size="small"
          @click="dialogVisible = true"
          >+ 选择素材</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="素材选择"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div />
      <el-table
        :data="materials"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="素材名" />
        <el-table-column prop="description" label="素材简介" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        autoPass: true,
        dynamicTags: [],
        chatKey: "tianxingKey",
        reply: true,
        welcomReply: true,
      },
      inputVisible: false,
      inputValue: "",
      dialogVisible: false,
      multipleSelection: [],
      materials: [],
    };
  },
  methods: {
    removeKeyword(tags, tag) {
      tags.splice(tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        this.config.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style lang="scss" scoped>
.tag {
  margin-right: 20px;
}
.input-new-tag {
  width: 200px;
}
</style>
