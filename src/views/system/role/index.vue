<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="角色名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.status" placeholder="状态" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.createBy" placeholder="创建者" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
<!--      <el-select v-model="listQuery.importance" :placeholder="重要性" clearable style="width: 90px" class="filter-item">-->
<!--        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />-->
<!--      </el-select>-->
<!--      <el-select v-model="listQuery.type" :placeholder="类型" clearable class="filter-item" style="width: 130px">-->
<!--        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />-->
<!--      </el-select>-->
<!--      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">-->
<!--        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />-->
<!--      </el-select>-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
<!--      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">-->
<!--        {{ $t('table.export') }}-->
<!--      </el-button>-->
<!--      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">-->
<!--        显示-->
<!--      </el-checkbox>-->
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
<!--          {{ scope.$index }}-->
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="角色名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="备注" >
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人">
        <template slot-scope="scope">
          {{ scope.row.createBy }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="更新人">
        <template slot-scope="scope">
          {{ scope.row.lastUpdateBy }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.lastUpdateTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-waves type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-waves type="primary" size="mini" @click="handleResourceUpdate(row)">
            分权限
          </el-button>
          <el-button v-waves size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="角色名" prop="name">
            <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="temp.status" label="1">正常</el-radio>
          <el-radio v-model="temp.status" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" v-waves @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogResourceVisible" title="分配权限">
      <el-tree
        :data="treeDataList"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        highlight-current
        check-on-click-node
        :default-checked-keys="defaultCheckedKeys"
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogResourceVisible = false">
          取消
        </el-button>
        <el-button v-waves type="primary" @click="updateResourceData">确认分配权限</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { queryRoleList, createRole, updateRole,deleteRole } from '@/api/system/role/role'
  import waves from '@/directive/waves'
  import Pagination from '@/components/Pagination'
  import { fetchList as treeList,updateRoleMenu } from '@/api/system/role/roleresources'
  import {tree} from "@/utils/utils";

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
          createBy: '',
          importance: undefined,
          title: undefined,
          type: undefined,
          status: ''
        },
        importanceOptions: [1, 2, 3],
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: '1'
        },
        dialogFormVisible: false,
        dialogResourceVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        treeDataList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        downloadLoading: false,
        treeListQuery: {
          current: 1,
          pageSize: 10000
        },
        roleResource: {
          role_id: '',
          menu_ids: ''
        },
        defaultCheckedKeys: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryRoleList(this.listQuery).then(response => {
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
          remarks: '',
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.temp.status = '1'
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.status = Number(this.temp.status)
            createRole(this.temp).then(() => {
              // this.list.unshift(this.temp)
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
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
            tempData.status = Number(this.temp.status)
            updateRole(tempData).then(() => {
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
                type: 'success',
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
          deleteRole({id:row.id}).then(response => {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      handleResourceUpdate(row) {
        treeList(row.id).then(response => {
          this.treeDataList = tree(response.allData,0,'parentId')
          console.log(this.treeDataList,'tree')
          this.defaultCheckedKeys = response.userData
          console.log(this.defaultCheckedKeys,'tree')
        })

        this.dialogStatus = 'update'
        this.dialogResourceVisible = true
        this.roleResource.role_id=row.id
      },
      updateResourceData() {
        console.log(this.$refs.tree.getCheckedKeys())
        this.roleResource.menu_ids=this.$refs.tree.getCheckedKeys()

        console.log(this.roleResource)
        updateRoleMenu(this.roleResource).then(() => {
              this.dialogResourceVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
              })
            })
          }
    }
  }
</script>
