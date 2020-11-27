<template>
  <div class="app-container">
    <el-form :model="query" ref="queryForm" inline size="middle"  @submit.native.prevent>
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="query.roleName"
          placeholder="请输入角色名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="getList"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="getList"
        >搜索
        </el-button>
        <el-button icon="el-icon-refresh" size="mini">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="onOpenRoleDialog"
        >新增
        </el-button>
        {{visible}}
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="roleList">

      <el-table-column label="角色编号" prop="roleId" width="120"/>

      <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150"/>

      <el-table-column label="角色标识" prop="roleCode" width="120"/>

      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="!!total"
      :total="total"
      :page.sync="query.current"
      :limit.sync="query.size"
      @pagination="getList"
    />

    <RoleAddOrEditDialog
      :visible.sync='visible'
      v-if="visible"
    />
  </div>
</template>

<script>
  import RoleAddOrEditDialog from './dialogs/RoleAddOrEditDialog'
  import {filterQuery} from '@/utils'
  import {listRole, addRole} from "@/api/system/role";

  export default {
    name: "Role",
    data() {
      return {
        loading: false,
        roleList: [],
        total: 0,
        query: {
          current: 1,
          size: 10,
          roleName: '',
        },
        visible: false
      };
    },
    methods: {
      onOpenRoleDialog() {
        this.visible = true
      },
      /** 查询角色列表 */
      getList() {
        this.loading = false
        let {query} = this
        listRole(filterQuery(query)).then(res => {
          this.loading = false
          let {records, total} = res.data
          this.total = total
          this.roleList = records
        })
      }
    },
    created() {
      this.getList();
    },
    components: {
      RoleAddOrEditDialog
    }
  };
</script>
