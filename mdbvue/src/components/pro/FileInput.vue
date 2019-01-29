<template>
  <form>
    <div class="file-field md-form">
      <div :class="btnClass">
        <span>{{btnTitle}}</span>
        <input type="file" :multiple="multiple" @change="(e)=>fileChange(e.target.files)" />
      </div>
      <div class="file-path-wrapper">
        <input :class="inputFieldClass" type="text" :placeholder="files ? files : textFieldTitle" />
      </div>
    </div>
  </form>
</template>

<script>
import classNames from 'classnames';

const FileInput = {
  props: {
    btnColor: {
      type: String,
      default: 'default'
    },
    btnTitle: {
      type: String,
      default: 'Choose file'
    },
    multiple: {
      type: Boolean,
    },
    textFieldTitle: {
      type: String,
      default: 'Upload your file'
    }
  },
  data() {
    return {
      files: false
    };
  },
  computed: {
    btnClass() {
      return classNames(
        'btn',
        'btn-' + this.btnColor,
        'btn-sm',
        'float-left'
      );
    },
    inputFieldClass() {
      return classNames(
        'file-path validate',
        this.files && 'valid'
      );
    }
  },
  methods: {
    fileChange(files){
      if (files.length > 0) {
        if (files.length > 1) {
          let filesNames = [];
          for (let i = 0; i < files.length; i++) {
            filesNames.push(files[i].name);
          }
          this.files = filesNames;
        } else {
          this.files = files[0].name;
        }
      } else {
        this.files = false;
      }
      this.$emit('getValue', this.$el[0].files);
    }
  }
};

export default FileInput;
export { FileInput as mdbFileInput };
</script>

<style scoped>

</style>
