<template>
  <page-view>
    <a-row :gutter="12">
      <a-col v-if="options.developer_mode" :lg="6" :md="12" :sm="24" :xl="6" :xs="24" class="pb-3">
        <a-card :bodyStyle="{ padding: '16px' }" :bordered="false">
          <div slot="title">
            <a-icon type="experiment" />
            开发者选项
          </div>
          <p style="min-height: 50px;">点击进入开发者选项页面</p>
          <a-button class="float-right" type="primary" @click="handleToDeveloperOptions()">进入</a-button>
        </a-card>
      </a-col>
      <a-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24" class="mb-3">
        <a-card :bodyStyle="{ padding: '16px' }" :bordered="false">
          <div slot="title">
            <a-icon type="hdd" />
            博客备份
          </div>
          <p style="min-height: 50px;">支持备份全站数据和数据导出，支持下载到本地</p>

          <a-dropdown class="float-right">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="backupWorkDirDrawerVisible = true">
                整站备份
              </a-menu-item>
              <a-menu-item key="2" @click="exportDataDrawerVisible = true">
                数据导出
              </a-menu-item>
              <a-menu-item key="3" @click="exportMarkdownDrawerVisible = true">
                导出文章为 Markdown 文档
              </a-menu-item>
            </a-menu>
            <a-button class="ml-2">
              备份
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </a-card>
      </a-col>
      <a-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24" class="pb-3">
        <a-card :bodyStyle="{ padding: '16px' }" :bordered="false">
          <div slot="title">
            <a-icon type="file-markdown" />
            Markdown 文章导入
          </div>
          <p style="min-height: 50px;">支持 Hexo/Jekyll 文章导入并解析元数据</p>
          <a-button class="float-right" type="primary" @click="markdownUpload = true">导入</a-button>
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      v-model="markdownUpload"
      :afterClose="onUploadClose"
      :footer="null"
      destroyOnClose
      title="Markdown 文章导入"
    >
      <FilePondUpload
        ref="upload"
        :uploadHandler="uploadHandler"
        label="拖拽或点击选择 Markdown 文件到此处"
        name="file"
      ></FilePondUpload>
    </a-modal>
    <BackupWorkDirDrawer v-model="backupWorkDirDrawerVisible"></BackupWorkDirDrawer>
    <ExportDataDrawer v-model="exportDataDrawerVisible"></ExportDataDrawer>
    <ExportMarkdownDrawer v-model="exportMarkdownDrawerVisible"></ExportMarkdownDrawer>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import BackupWorkDirDrawer from './components/BackupWorkDirDrawer'
import ExportDataDrawer from './components/ExportDataDrawer'
import ExportMarkdownDrawer from './components/ExportMarkdownDrawer'

import { mapGetters } from 'vuex'
import apiClient from '@/utils/api-client'

export default {
  components: { PageView, BackupWorkDirDrawer, ExportDataDrawer, ExportMarkdownDrawer },
  data() {
    return {
      backupWorkDirDrawerVisible: false,
      exportDataDrawerVisible: false,
      exportMarkdownDrawerVisible: false,
      markdownUpload: false,
      uploadHandler: (file, options) => apiClient.backup.importMarkdown(file, options)
    }
  },
  computed: {
    ...mapGetters(['options'])
  },
  methods: {
    handleChange(info) {
      const status = info.file.status
      if (status !== 'uploading') {
        this.$log.debug(info.file, info.fileList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} 导入成功！`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 导入失败！`)
      }
    },
    handleToDeveloperOptions() {
      this.$router.push({ name: 'DeveloperOptions' })
    },
    onUploadClose() {
      this.$refs.upload.handleClearFileList()
    }
  }
}
</script>
