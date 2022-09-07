import type { TinyMCE } from '../components/form/TinyEditor/tinymce'

declare global {
  interface Window {
    tinymce: TinyMCE
  }
}
