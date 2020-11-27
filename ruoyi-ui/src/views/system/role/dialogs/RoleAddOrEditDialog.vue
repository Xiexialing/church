<template>
  <!-- 添加或修改角色配置对话框 -->
  <el-dialog
    :title="title"
    :visible="visible"
    width="500px"
    append-to-body
    @close="onCancel"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称"/>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="onSubmit">确 定</el-button>
      <el-button @click="onCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "RoleAddOrEditDialog",
    props: {
      visible: {
        type: Boolean
      }
    },
    data() {
      return {
        form: {
          roleName: '',
          remark: ''
        }
      }
    },
    methods: {
      onCancel() {
        this.$emit('update:visible', false)
      },
      onSubmit() {
        let {roleName, remark} = this.form

      }
    }
  }
</script>

<style scoped>

</style>
