<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="机构名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.createBy" placeholder="创建人" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
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
      row-key="id"
      fit
      highlight-current-row
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="机构名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="父id" >
        <template slot-scope="scope">
          <span>{{ scope.row.parentId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template slot-scope="scope">
          {{ scope.row.orderNum }}
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
          <el-button v-waves type="primary" size="mini" @click="handleCreateChild(row)">
            添加
          </el-button>
          <el-button v-waves type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-waves size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input v-model="temp.orderNum"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
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
  import { createDept, deleteDept, querDeptList, updateDept } from '@/api/system/dept/dept'
  import {tree} from "@/utils/utils";
  import waves from '@/directive/waves'

  export default {
    name: 'ComplexTable',
    directives: { waves },
    data() {
      return {
        tableKey: 0,
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          current: 1,
          pageSize: 10,
          name: '',
          createBy: '',
        },
        temp: {
          id: undefined,
          remarks: '',
          title: '',
          type: '',
          status: 'published',
          name: '',
          orderNum: 0,
          parentId: 0,
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        dialogRoleVisible: false,
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
        querDeptList(this.listQuery).then(response => {
          console.log(response.data,66666)
          this.list = tree(response.data,0,'parentId')
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
        this.temp.parentId=0
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleCreateChild(row) {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.temp.parentId=Number(row.id)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.orderNum=Number(this.temp.orderNum)
            console.log(this.temp,321232)
            createDept(this.temp).then(() => {
              // this.list.unshift(this.temp)
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success'
                // duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
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
            tempData.orderNum=Number(this.temp.orderNum)
            tempData.timestamp = +new Date(tempData.timestamp)
            updateDept(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.getList()
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
        if (row.children){
          this.$message({
            showClose: true,
            message: '警告哦，包含子项不能直接删除',
            type: 'warning'
          });
          return
        }
        console.log(row)
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          deleteDept(row.id).then(response => {
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
