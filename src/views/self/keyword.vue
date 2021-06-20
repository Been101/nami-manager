<template>
  <div class="app-container">
    <h3>关键词回复</h3>
    <h4>
      <el-alert
        title="当好友直接向你发送关键词时，会自动回复设置的内容。"
        type="error"
        :closable="false"
      />
    </h4>

    <el-button type="primary" @click="addRules">新增规则</el-button>
    <div v-show="editable" class="add-rules">
      <el-row class="row">
        <el-col :span="12">
          <div class="label"><span class="required">*</span>关键词</div>
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="removeKeyword(dynamicTags, tag)"
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
        </el-col>
        <el-col :span="12">
          <div class="label"><span class="required">*</span> 匹配方式</div>
          <el-radio-group v-model="matchValue">
            <el-radio label="fuzzy">模糊匹配</el-radio>
            <el-radio label="exact">精确匹配</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="row">
        <div class="label"><span class="required">*</span> 回复内容</div>
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
      </el-row>
      <el-row class="row">
        <div class="edit-footer">
          <el-button @click="cancelEdit">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确认</el-button>
        </div>
      </el-row>
    </div>
    <div v-show="!editable" class="show-rules">
      <el-table :data="rules" style="width: 100%">
        <el-table-column prop="keyword" label="关键词" />
        <el-table-column prop="matchMethod" label="匹配规则" />
        <el-table-column prop="responseContent" label="回复内容" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteRule(scope.row)"
              >删除</el-button
            >
            <el-button type="text" size="small" @click="editRule(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
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
import { getList } from "@/api/table";

export default {
  data() {
    return {
      editable: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      matchValue: "fuzzy",
      dialogVisible: false,
      materials: [
        {
          id: 1,
          name: "aa",
          description: "aaaa",
        },
        {
          id: 2,
          name: "bb",
          description: "bbbb",
        },
      ],
      multipleSelection: [],
      rules: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    addRules() {
      this.editable = true;
    },
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {});
    },
    addMaterial() {},
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
        this.dynamicTags.push(inputValue);
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
    cancelEdit() {},
    confirmEdit() {},
    deleteRule(row) {},
    editRule(row) {},
  },
};
</script>
<style lang="scss" scoped>
.row {
  margin-bottom: 20px;
}
.add-rules {
  margin-top: 20px;
  .label {
    margin: 5px 0;
    font-weight: bold;
    .required {
      color: red;
    }
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.select-material {
  margin-left: 10px;
}
.edit-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
