<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="权限名称" style="width: 200px;" class="filter-item" @keyup.enter.native="" />
      <el-input v-model="listQuery.createBy" placeholder="路径" style="width: 200px;" class="filter-item" @keyup.enter.native="" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreateWithOutPid">
        添加
      </el-button>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      highlight-current-row
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="id"
        label="Id"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="权限名称"
       >
      </el-table-column>
      <el-table-column label="父id" >
        <template slot-scope="scope">
          <span>{{ scope.row.parent_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="图标">
        <template slot-scope="scope">
          {{ scope.row.icon }}
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template slot-scope="scope">
          {{ scope.row.order_num }}
        </template>
      </el-table-column>
      <el-table-column label="创建人">
        <template slot-scope="scope">
          {{ scope.row.create_by }}
        </template>
      </el-table-column>
      <el-table-column label="创建人">
        <template slot-scope="scope">
          {{ scope.row.create_by }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="更新人">
        <template slot-scope="scope">
          {{ scope.row.last_update_by }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.last_update_time }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleCreate(row)">
            添加
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>

          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="路径" prop="url">
          <el-input v-model="temp.url" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="temp.type"/>
        </el-form-item>
        <el-form-item label="排序" prop="order_num">
          <el-input v-model="temp.order_num" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import { fetchList, createResources, deleteResources, updateResources } from '@/api/system/resource/resources'
  import { parseTime } from '@/utils'
  import {tree} from "@/utils/utils";

  export default {
    methods: {
      getList() {
        fetchList(this.listQuery).then(response => {
          this.tableData = tree(response.data,0,'parent_id')
        })
      },
      handleCreateWithOutPid() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleCreate(row) {
        this.resetTemp()
        this.temp.pid=row.id
        console.log(this.temp.pid)
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            console.log(this.temp)
            createResources(this.temp).then(() => {
              // this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.getList()
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
        this.temp.name=row.name
        this.temp.id=row.id
        this.temp.remarks=row.remarks
        this.temp.timestamp = new Date(this.temp.timestamp)
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
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateResources(tempData).then(() => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
                // duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        console.log(row.children)
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
          deleteResources(row.id).then(response => {
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

      resetTemp() {
        this.temp = {
          id: undefined,
          name: '',
          age: '',
          phone: '',
          email: '',
          createTime: new Date(),
          remarks: '',
          pid: ''
        }
      },
    },
    created: function() {
      this.getList()
    },

    filters: {
      TIME: function(val) {
        return parseTime(val)
      }
    },
    data() {
      return {
        tableData: [],
        temp: {
          id: undefined,
          importance: 1,
          remarks: '',
          timestamp: new Date(),
          title: '',
          type: '',
          name: '',
          status: 'published',
          pid: ''
        },
        pid: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogStatus: '',
        dialogFormVisible: false,
        listQuery: {
          current: 1,
          pageSize: 10000

        }
      }
    }
  }
</script>
