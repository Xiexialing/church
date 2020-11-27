<template>
  <el-dialog
    :title="!!editRow ? '编辑' : '新增'"
    :visible="visible"
    width="500px"
    append-to-body
    @close="onCancel"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名" prop="fullName">
        <el-input v-model="form.fullName" placeholder="请输入姓名"/>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号"/>
      </el-form-item>

      <el-form-item label="是否固定">
        <el-radio-group v-model="form.fixedFlag">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="onSubmit" :loading="loading">确 定</el-button>
      <el-button @click="onCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "ChristianAddOrEditDialog",
    props: {
      visible: {
        type: Boolean
      },
      editRow: {
        type: Object
      }
    },
    data() {
      return {
        form: {
          fullName: '',
          sex: 1,
          mobile: '',
          fixedFlag: 1
        },
        loading: false
      }
    },
    methods: {
      onCancel() {
        this.$emit('update:visible', false)
      },
      onSubmit() {
        this.loading = true
        this.$emit('submit', this.form, () => {
          this.onCancel()
        })
      },
      initEditForm() {
        let {form, editRow} = this
        Object.assign(form, editRow)
      }
    },
    mounted() {
      this.initEditForm()
    }
  }
</script>

<style scoped>

</style>
