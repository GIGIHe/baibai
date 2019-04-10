<template>
  <div class="goods_l">
    <el-table
      :data="tableData"
      border
      highlight
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
     <el-table-column
        prop="user.username"
        label="用户名"
         width="120"
      >
      </el-table-column>
      <el-table-column
        prop="goods.g_name"
        label="商品名称"
         width="120"
      >
      </el-table-column>
      <el-table-column
        prop="_id"
        label="订单编号"
      >
      </el-table-column>
      <el-table-column
        prop="user.address"
        label="地址"
      >
      </el-table-column>
      <el-table-column
      prop = "created_at"
        label="下单时间"
        :formatter="formatterColumn"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
           <!-- <el-button
            size="mini"
            type="primary" icon="el-icon-edit"
            @click="handleEdit(scope.row._id,scope.row.user._id)"
          >编辑</el-button> -->
           <el-button
            size="mini"
            type="primary" icon="el-icon-edit"
            @click="handleDesc(scope.row._id,scope.row.user._id)"
          >详情</el-button>
          <el-button
            size="mini"
            type="danger"
             icon="el-icon-delete"
            @click="handleDelete(scope.row._id,scope.row.user._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
 <el-pagination background layout="prev,pager,next" :total="count"  :page-size = "1"   @current-change="handleCurrentChange">
        </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
       pn:1,
      count:1
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
      handle() {
    }
  },
  methods: {
    getData() {
      this.$axios.get("/order/all",{pn:this.pn,size:10}).then(res => {
        if (res.code == 200) {
          this.$store.commit("CHANGE_ORDER", res.data);
          this.tableData = res.data;
          this.count = res.count
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    handleEdit(id1,id2){
      this.$router.push({path:'/update_order',query:{order:id1,user:id2}})

    },
    handleDelete(id1,id2) {
        // console.log(id1,id2);
        this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios.delete(`/order/${id2}/${id1}`).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData()
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
    formatterColumn(row, column){
      // console.log(row,column);
      let date = new Date(row.created_at);
      //  var date = new Date(created_at)
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day =  ("0" + date.getDate()).slice(-2);
        let hours = ("0" + date .getHours()).slice(-2);
        let minutes = ("0" +date.getMinutes()).slice(-2);
        let sed = ("0" +date.getSeconds()).slice(-2);
        return `${year}/${month}/${day} ${hours}:${minutes}:${sed}`
    },
    handleDesc(id1,id2){
     this.$router.push({path:'/order_desc',query:{order:id1,user:id2}})
    },
      handleCurrentChange(page) {
      console.log(page);
      this.pn = page;
      this.getData()
    }
    },


};
</script>

<style scoped lang = "scss">
.goods_l {
  /deep/ .el-table td,
  /deep/ .el-table th {
    text-align: center;
  }
  /deep/ .el-pagination{
    float: right;
    margin-right: 20px;
  }
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
