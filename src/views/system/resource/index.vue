<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="权限名称" style="width: 200px;" class="filter-item" @keyup.enter.native="" />
      <el-input v-model="listQuery.createBy" placeholder="路径" style="width: 200px;" class="filter-item" @keyup.enter.native="" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="">
        查询
      </el-button>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreateWithOutPid">
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
          <span>{{ scope.row.parentId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径">
        <template slot-scope="scope">
          {{ scope.row.vuePath }}
        </template>
      </el-table-column>
      <el-table-column label="页面">
        <template slot-scope="scope">
          {{ scope.row.vueComponent }}
        </template>
      </el-table-column>
      <el-table-column label="重定向">
        <template slot-scope="scope">
          {{ scope.row.vueRedirect }}
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="图标">
        <template slot-scope="scope">
          {{ scope.row.vueIcon }}
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
          <el-button v-waves type="primary" size="mini" @click="handleCreate(row)">
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="路径" prop="vuePath">
          <el-input v-model="temp.vuePath" />
        </el-form-item>
        <el-form-item label="页面" prop="vueComponent">
          <el-input v-model="temp.vueComponent" />
        </el-form-item>
        <el-form-item label="重定向" prop="vueRedirect">
          <el-input v-model="temp.vueRedirect" />
        </el-form-item>
        <el-form-item label="图标" prop="vueIcon">
          <el-input v-model="temp.vueIcon" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="temp.type"/>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input v-model="temp.orderNum" />
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
  import { queryMenuList, createResources, deleteResources, updateResources } from '@/api/system/resource/resources'
  import {tree} from "@/utils/utils";
  import waves from '@/directive/waves'

  export default {
    directives: { waves },
    methods: {
      getList() {
        queryMenuList(this.listQuery).then(response => {
          this.tableData = tree(response.data,0,'parentId')
        })
      },
      handleCreateWithOutPid() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.temp.parentId=0
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleCreate(row) {
        this.resetTemp()
        this.temp.pid=row.id
        console.log(this.temp.pid)
        this.temp.parentId=Number(row.id)
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.orderNum=Number(this.temp.orderNum)
            this.temp.type=Number(this.temp.type)
            createResources(this.temp).then(() => {
              this.dialogFormVisible = false
              this.getList()
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
            tempData.timestamp = +new Date(tempData.timestamp)
            updateResources(tempData).then(() => {
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

    data() {
      return {
        tableData: [],
        temp: {
          id: undefined,
          importance: 1,
          remarks: '',
          timestamp: new Date(),
          title: '',
          type: 0,
          name: '',
          status: 'published',
          pid: '',
          vuePath: '',
          vueComponent: '',
          vueIcon: '',
          vueRedirect: '',
          parentId: 0,
          orderNum: 0,
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
