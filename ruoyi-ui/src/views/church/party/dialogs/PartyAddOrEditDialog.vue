<template>
  <el-dialog
    :title="!!editRow ? '编辑' : '新增'"
    :visible="visible"
    width="500px"
    append-to-body
    @close="onCancel"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="聚会日期">
        <el-date-picker
          v-model="form.meetingDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item label="开始时间">
        <el-time-picker
          v-model="form.startTime"
          value-format="HH:mm:ss"
          placeholder="开始时间"
        />
      </el-form-item>

      <el-form-item label="结束时间">
        <el-time-picker
          v-model="form.endTime"
          value-format="HH:mm:ss"
          placeholder="结束时间"
        />
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
    name: "PartyAddOrEditDialog",
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
          meetingDate: '',
          startTime: '',
          endTime: '',
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
