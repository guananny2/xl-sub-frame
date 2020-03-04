<template>
  <el-row class="handleinfo">
    <div class="handleinfotitle">
      企业申报详情
    </div>
    <div class="error">
      <span class="title">异常信息</span>
      <el-divider />
      <span class="detail">{{ applyInfo.entName }}  > {{ applyInfo.devicesString }}于{{ applyInfo.startTime }}至{{ applyInfo.endTime }}{{ applyInfo.productStatusName }}维护</span>
    </div>
    <div class="apply">
      <span class="title">环保设备维护信息申报</span>
      <el-divider />
      <el-row class="info-row">
        <el-col :span="4" class="info-left">企业名称</el-col><el-col :span="20" class="info-right">{{ applyInfo.entName }}</el-col>
      </el-row>
      <el-row class="info-row">
        <el-col :span="4" class="info-left">申报人</el-col><el-col :span="20" class="info-right">{{ applyInfo.declareMan }}</el-col>
      </el-row>
      <el-row class="info-row">
        <el-col :span="4" class="info-left">联系方式</el-col><el-col :span="20" class="info-right">{{ applyInfo.declareManLinkPhone }}</el-col>
      </el-row>
      <el-row class="info-row">
        <el-col :span="4" class="info-left">情况描述</el-col><el-col :span="20" class="info-right">{{ applyInfo.deSitu }}</el-col>
      </el-row>
      <el-row class="info-row">
        <el-col :span="4" class="info-left">附件</el-col><el-col :span="20" class="info-right">暂无附件</el-col>
      </el-row>
    </div>
    <div>
      <span class="title">审核信息</span>
      <el-divider />
      <el-row class="info-row">
        <el-col :span="4" class="info-left">审核意见</el-col>
        <el-col :span="4" class="info-right">{{ applyInfo.entName }}</el-col>
        <el-col :span="4" class="info-left">审核时间</el-col>
        <el-col :span="4" class="info-right">{{ applyInfo.entName }}</el-col>
      </el-row>
      <el-row class="info-row">
        <el-col :span="4" class="info-left">审核机构</el-col>
        <el-col :span="4" class="info-right">{{ applyInfo.entName }}</el-col>
        <el-col :span="4" class="info-left">审核人</el-col>
        <el-col :span="4" class="info-right">{{ applyInfo.entName }}</el-col>
      </el-row>
    </div>
    <div>
      <span class="title">环保局受理</span>
      <el-divider />
      <el-form ref="form" :model="form" label-width="80px">
        <el-row class="info-row">
          <el-col :span="4" class="info-left">受理情况</el-col>
          <el-col :span="20" class="info-right">
            <XLSelect
              v-model="form.code"
              url="/failureBeforehand/status"
              label-key="name"
              value-key="code"
            />
          </el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :span="4" class="info-left">受理详情</el-col>
          <el-col :span="20" class="info-right">
            <el-input v-model="form.desc" type="textarea" />
          </el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :offset="4" :span="20" class="info-right">
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-row>
</template>

<script>
import { fetchReviewStatus, fetchReviewDetail } from '@/api/pollution/failureBeforehand'
import XLSelect from '@/components/XLSelect'

export default {
  name: 'HandleInfo',
  components: {
    XLSelect
  },
  data() {
    return {
      id: '',
      applyInfo: {},
      status: [],
      form: {
        id: '',
        code: '',
        desc: ''
      }
    }
  },
  created() {
    if (this.$route && this.$route.params) {
      const { id } = this.$route.params
      this.id = id
      this.form.id = id
      this.gethandleInfo()
      this.getList()
    }
  },
  methods: {
    getList() {
      fetchReviewStatus(this.query).then(({ code, data }) => {
        // TODO 逻辑判断
        this.status = data
        console.log('审核状态', data)
      })
    },
    gethandleInfo() {
      fetchReviewDetail(this.query).then(({ code, data }) => {
        // TODO 逻辑判断
        this.applyInfo = data
        console.log('详情', this.applyInfo)
      })
    },
    onSubmit() {
      console.log('this form', this.form)
    }
  }
}
</script>

<style scoped lang="scss">
  .handleinfo {
    color: #606266;
    .handleinfotitle {
      font-weight: 700;
      color: #1f2f3d;
      padding-left: 20px;
      font-size: 20px;
      padding-bottom: 20px;
      padding-top: 20px;
    }
    .el-divider--horizontal {
      margin-top: 10px;
    }
    .title {
      font-weight: 600;
      color: #1f2f3d;
      padding-left: 20px;
    }
    .error {
      padding-bottom: 20px;
      .detail {
        padding-left: 20px;
      }
    }
    .apply {
      padding-bottom: 20px;
    }
    .info-row {
        padding-top: 10px;
        padding-bottom: 10px;

        .info-left {
          text-align: right;
          padding-right: 10px;
        }
        .info-right {
          padding-left: 10px;
        }
      }
  }
</style>>
