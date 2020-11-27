<template>
  <div class="app-container">
    <el-form :model="form" inline @submit.native.prevent>
      <el-form-item label="姓名" prop="fullName">
        <el-input v-model="form.fullName" placeholder="请输入姓名"/>
      </el-form-item>

      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号"/>
      </el-form-item>

      <el-form-item label="是否固定">
        <el-select clearable v-model="form.fixedFlag">
          <el-option :value="1" label="是"/>
          <el-option :value="0" label="否"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="getList"
        >搜索
        </el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="onOpenChristianDialog()"
        >新增
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="christianList" text-align="center">

      <el-table-column label="序号" prop="christianId"/>

      <el-table-column label="姓名" prop="fullName" show-overflow-tooltip/>

      <el-table-column label="性别">
        <template slot-scope="{row}">
          {{row.sex === 1 ? '男' : '女'}}
        </template>
      </el-table-column>

      <el-table-column label="手机号" prop="mobile" width="120px"/>

      <el-table-column label="是否固定">
        <template slot-scope="{row}">
          <span :style="{color: row.fixedFlag === 1 ? '#67C23A' : '#F56C6C'}">{{row.fixedFlag === 1 ? '是' : '否'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="聚会次数" prop="meetingCount"/>

      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="{row}">
          <el-button
            type="text"
            @click="onOpenChristianDialog(row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="onDelete(row)"
          >删除
          </el-button>
          <el-button
            type="text"
            @click="onCreateQRCode(row)"
          >
            <a
              :href="'/admin/christian/qrcode/download/' + row.christianId"
              v-if="row.qrcodeFlag === 1"
              style="color: #67C23A"
            >下载二维码</a>
            <span v-else style="color: #F56C6C">生成二维码</span>
          </el-button>
          <el-button
            type="text"
            @click="onShowChristianMeetingRecord(row)"
          >聚会纪录
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="!!total"
      :total="total"
      :page.sync="form.current"
      :limit.sync="form.size"
      @pagination="getList"
    />

    <ChristianAddOrEditDialog
      :visible.sync='visible'
      :editRow="editRow"
      v-if="visible"
      @submit="onSubmit"
    />

    <ChristianMeetingRecordDialog
      :visible.sync='meetingRecordVisible'
      :list="meetingRecordList"
      v-if="meetingRecordVisible"
    />
  </div>
</template>

<script>
  import ChristianAddOrEditDialog from './dialogs/ChristianAddOrEditDialog'
  import ChristianMeetingRecordDialog from './dialogs/ChristianMeetingRecordDialog'
  import {filterQuery} from '@/utils'
  import {
    listChristian,
    addChristian,
    updateChristian,
    delChristianId,
    createQrcode,
    getChristianMeetingRecord
  } from "@/api/church/christian";

  export default {
    name: "christian",
    data() {
      return {
        form: {
          current: 1,
          size: 10
        },
        total: 0,
        loading: true,
        christianList: [],
        editRow: null,
        visible: false,
        meetingRecordList: [],
        meetingRecordVisible: false
      }
    },
    methods: {
      onShowChristianMeetingRecord({christianId}) {
        getChristianMeetingRecord(christianId).then(res=>{
          let {code, data, msg} = res
          if(code === 0) {
            this.meetingRecordList = data.records
            this.meetingRecordVisible = true
          }else{
            this.$message.error(msg)
          }
        })
      },
      onCreateQRCode(row) {
        let {qrcodeFlag, christianId} = row
        if (qrcodeFlag === 1) return
        createQrcode(christianId).then(res => {
          let {code, msg} = res
          if (code === 0) {
            this.$message.success(msg)
            this.getList()
          } else {
            this.$message.error(msg)
          }
        })
      },
      onSubmit(form, callback) {
        let {christianId} = form
        let fnName = !!christianId ? updateChristian : addChristian
        fnName(form).then(res => {
          let {code, msg} = res
          if (code === 0) {
            this.$message.success(msg)
            this.getList()
          } else {
            this.$message.error(msg)
          }
          callback && callback()
        })
      },
      onDelete({christianId}) {
        this.$confirm('确定要删除该用户么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              delChristianId(christianId).then((res) => {
                let {code, msg} = res
                if (code === 0) {
                  this.$message.success(msg)
                  this.getList()
                } else {
                  this.$message.error(msg)
                }
                done();
                instance.confirmButtonLoading = false;
              })
            } else {
              done();
            }
          }
        }).catch(() => {
        });
      },
      onOpenChristianDialog(row) {
        this.editRow = row
        this.visible = true
      },
      getList() {
        this.loading = true
        let {form} = this
        listChristian(filterQuery(form)).then(res => {
          let {records, total} = res.data
          this.christianList = records
          this.total = total
          this.loading = false
        })
      }
    },
    created() {
      this.getList()
    },
    components: {
      ChristianAddOrEditDialog,
      ChristianMeetingRecordDialog
    }
  }
</script>

<style scoped>

</style>
