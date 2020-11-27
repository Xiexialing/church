<template>
  <div class="app-container">
    <el-form :model="form" inline @submit.native.prevent>
      <el-form-item label="聚会日期" prop="roleName">
        <el-date-picker
          v-model="form.meetingDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item>
        <el-button
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
          @click="onOpenPartyDialog()"
        >新增
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="partyList">

      <el-table-column label="序号" prop="meetingId" width="120"/>

      <el-table-column label="聚会日期" prop="meetingDate" show-overflow-tooltip width="150"/>

      <el-table-column label="开始时间" prop="startTime" width="120"/>

      <el-table-column label="结束时间" prop="endTime" width="120"/>

      <el-table-column label="创建时间" align="center" prop="createTime" width="180"/>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="text"
            @click="onOpenPartyDialog(row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="onDelete(row)"
          >删除
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

    <PartyAddOrEditDialog
      :visible.sync='visible'
      :editRow="editRow"
      v-if="visible"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
  import PartyAddOrEditDialog from './dialogs/PartyAddOrEditDialog'
  import {listMeeting, addMeeting, updateMeeting, delMeeting} from "@/api/church/party";

  export default {
    name: "party",
    data() {
      return {
        form: {
          current: 1,
          size: 10
        },
        total: 0,
        loading: true,
        partyList: [],
        editRow: null,
        visible: false
      }
    },
    methods: {
      onSubmit(form, callback) {
        let {meetingId} = form
        let fnName = !!meetingId ? updateMeeting : addMeeting
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
      onDelete({meetingId}) {
        this.$confirm('确定要删除该聚会么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              delMeeting(meetingId).then((res) => {
                done();
                instance.confirmButtonLoading = false;
                let {code, msg} = res
                if (code === 0) {
                  this.$message.success(msg)
                  this.getList()
                } else {
                  this.$message.error(msg)
                }
              })
            } else {
              done();
            }
          }
        }).catch(() => {
        });
      },
      onOpenPartyDialog(row) {
        this.editRow = row
        this.visible = true
      },
      getList() {
        this.loading = true
        let {form} = this
        listMeeting(form).then(res => {
          let {records, total} = res.data
          this.partyList = records
          this.total = total
          this.loading = false
        })
      }
    },
    created() {
      this.getList()
    },
    components: {
      PartyAddOrEditDialog
    }
  }
</script>

<style scoped>

</style>
