<template>
  <el-card class="show-card">
    <el-row slot="header" type="flex" justify="space-between">
      <h2 style="margin:10px 0 0 0">{{form.ticketTitle}}</h2>
      <el-select v-model="form.state" disabled>
        <el-option v-for="state in possibleStates" :key="state.value" :label="state.label"
                   :value="state.value"></el-option>
      </el-select>
    </el-row>
    <vue-markdown style="min-height: 120px;" :source="form.ticketDescription"></vue-markdown>
    <div>
      <div class="divider"></div>
      <h2 class="question-title">{{form.title}}</h2>
      <span class="creator-name">{{form.creatorName}}</span>
      <vue-markdown class="preview" :source="form.description"></vue-markdown>
      <div class="divider"></div>
      <h3>Answer</h3>

      <div v-if="form.state === 'solved'">
        <vue-markdown class="preview" :source="form.answer"></vue-markdown>
      </div>

      <el-form v-if="form.state === 'waiting_for_answers'" :model="form" class="form">
        <el-tabs type="card">
          <el-tab-pane label="Text">
            <el-input type="textarea" v-model="form.answer" :rows="5" placeholder="Description"></el-input>
          </el-tab-pane>
          <el-tab-pane label="Preview">
            <vue-markdown class="el-textarea el-textarea__inner preview" :source="form.answer"></vue-markdown>
          </el-tab-pane>
        </el-tabs>
        <el-button :loading="answerLoading" type="primary" @click="answerQuestion" style="margin-top: 15px">Answer
        </el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'show-secondary-question',
    components: {
      VueMarkdown
    },
    data () {
      return {
        form: {
          title: '',
          description: '',
          state: 'waiting_for_answers',
          answer: '',
          creatorName: ''
        },
        preview: false,
        buttonText: 'Preview',
        possibleStates: [
          {
            value: 'waiting_for_answers',
            label: 'Waiting for answers'
          }, {
            value: 'solved',
            label: 'Solved'
          }
        ],
        assignLoading: false,
        answerLoading: false
      }
    },
    mounted: function () {
      const questionId = this.$route.params.id
      this.$root.$data.feathers.service('secondary-questions').get(questionId).then(result => {
        if (result.answer === null) {
          result.answer = ''
        }

        this.$set(this, 'form', result)
      })
    },
    methods: {
      answerQuestion: function () {
        const questionId = this.$route.params.id

        this.answerLoading = true
        this.$root.$data.feathers.service('secondary-questions').patch(questionId, {
          state: 'solved',
          answer: this.form.answer
        }).then(() => {
          this.answerLoading = false
          this.$message({
            type: 'success',
            message: 'Question answered successfully!',
            showClose: true
          })
          this.form.state = 'solved'
        }).catch(() => {
          this.answerLoading = false
          this.$message({
            type: 'error',
            message: 'Error answering question. Please try again.',
            showClose: true
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .show-card {
    max-width: 800px;
    margin: auto;
  }

  .preview {
    text-align: left;
    min-height: 120px;
    min-width: 100%;
  }

  .divider {
    width: 100%;
    border-bottom: 1px solid #d0d0d0;
  }

  .creator-name {
    color: grey;
    font-size: 75%;
  }

  .question-title {
    margin-bottom: 2px;
  }
</style>
