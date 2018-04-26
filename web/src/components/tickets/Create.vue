<template>
  <el-form :model="form" class="form" label-width="120px">
    <el-form-item label="Title">
      <el-input placeholder="Title" v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="Description">
      <el-input type="textarea" v-model="form.description" :rows="5" placeholder="Description"></el-input>
    </el-form-item>
    <el-form-item label="Preview">
      <vue-markdown class="el-textarea el-textarea__inner" style="text-align: left; min-height: 120px;"
                    :source="form.description"></vue-markdown>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'create-ticket',
    components: {
      VueMarkdown
    },
    data () {
      return {
        form: {
          title: '',
          description: ''
        }
      }
    },
    methods: {
      submit: function () {
        this.$root.$data.feathers.service('tickets').create(this.form).then(result => {
          console.log(result)
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media (max-width: 800px) {
    .form {
      width: 100%;
      margin: auto;
    }
  }

  .form {
    width: 800px;
    margin: auto;
  }
</style>
