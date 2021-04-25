<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="名字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.phone" placeholder="手机" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.nickName" placeholder="呢称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="会员名">
        <template slot-scope="scope">
          {{ scope.row.member_id }}
        </template>
      </el-table-column>
      <el-table-column label="ip地址" >
        <template slot-scope="scope">
          <span>{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="省份/直辖市">
        <template slot-scope="scope">
          {{ scope.row.province }}
        </template>
      </el-table-column>
      <el-table-column label="城市">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column label="登录类型">
        <template slot-scope="scope">
          {{ scope.row.login_type }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-waves type="primary" size="mini"  @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-waves size="mini" type="danger"  @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用名字" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="呢称" prop="nickName">
          <el-input v-model="temp.nickName"/>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="temp.mobile"/>
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="temp.email"/>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-input v-model="temp.deptId"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
        <el-radio v-model="temp.status" label="1">正常</el-radio>
        <el-radio v-model="temp.status" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
        <el-select v-model="temp.roleId" placeholder="请选择角色">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.remark"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-waves @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button v-waves type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { createMemberLog, deleteMemberLog, queryMemberLogList, updateMemberLog } from '@/api/ums/member_login_log/index'
  import { queryRoleList } from '@/api/system/role/role'

  import waves from '@/directive/waves'
  import Pagination from '@/components/Pagination'

  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]

  // arr to obj, such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'ComplexTable',
    components: { Pagination },
    directives: { waves },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      },
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          current: 1,
          pageSize: 10,
          name: '',
          phone: '',
          nickName: '',
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remarks: '',
          title: '',
          email: '',
          type: '',
          mobile: '',
          nickName: '',
          status: '',
          roleId: '',
          role_id: '',
          deptId: undefined,
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        pvData: [],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        downloadLoading: false,
        options: [],
        value: '',
        userRole: {
          userId: '',
          roleId: ''
        },
      }
    },
    created() {
      this.getList()

    },
    methods: {
      getList() {
        this.listLoading = true
        queryMemberLogList(this.listQuery).then(response => {
          console.log(response.data)
          this.list = response.data
          this.total = response.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.current = 1
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      sortChange(data) {
        const { prop, order } = data
        if (prop === 'id') {
          this.sortByID(order)
        }
      },
      sortByID(order) {
        if (order === 'ascending') {
          this.listQuery.sort = '+id'
        } else {
          this.listQuery.sort = '-id'
        }
        this.handleFilter()
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          name: '',
          age: '',
          phone: '',
          email: '',
          createTime: new Date(),
          remarks: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.role_id = this.temp.roleId+''
            createMemberLog(this.temp).then(() => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success'
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        this.temp.status = row.status+''
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.role_id = this.temp.roleId+''
            updateMemberLog(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
              })
            })
          }
        })
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          deleteMemberLog(row.id).then(response => {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },


    }
  }
</script>
