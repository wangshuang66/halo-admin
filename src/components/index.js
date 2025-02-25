import Vue from 'vue'

import Ellipsis from '@/components/Ellipsis'
import FooterToolbar from '@/components/FooterToolbar'
import FilePondUpload from '@/components/Upload/FilePondUpload'
import AttachmentSelectDrawer from './Attachment/AttachmentSelectDrawer'
import AttachmentUploadModal from './Attachment/AttachmentUploadModal'
import ReactiveButton from './Button/ReactiveButton'

const _components = {
  Ellipsis,
  FooterToolbar,
  FilePondUpload,
  AttachmentSelectDrawer,
  AttachmentUploadModal,
  ReactiveButton
}

const components = {}

Object.keys(_components).forEach(key => {
  components[key] = Vue.component(key, _components[key])
})

export default components
