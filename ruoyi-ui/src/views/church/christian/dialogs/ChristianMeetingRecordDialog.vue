<template>
  <el-dialog
    title="聚会纪录"
    :visible="visible"
    width="800px"
    append-to-body
    @close="onCancel"
  >
    <el-table :data="list">

      <el-table-column label="序号" prop="meetingId"/>

      <el-table-column label="聚会日期" prop="meetingDate" show-overflow-tooltip/>

      <el-table-column label="开始时间" prop="startTime"/>

      <el-table-column label="结束时间" prop="endTime"/>

    </el-table>
    <div slot="footer">
      <el-button @click="onCancel">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "ChristianMeetingRecordDialog",
    props: {
      visible: {
        type: Boolean
      },
      list: {
        type: Array
      }
    },
    methods: {
      onCancel() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style scoped>

</style>
