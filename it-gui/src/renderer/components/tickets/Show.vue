<template>
  <el-card class="show-card">
    <el-row slot="header" type="flex" justify="space-between">
      <el-col> 
        <h2 style="margin:10px 0 0 0">{{form.title}}</h2>
        <span class="creator-name">{{form.user.name}} - {{form.user.email}}</span>
        <span class="creator-name">| {{form.createdAt.toLocaleString()}}</span>
      </el-col>
      <el-select v-model="form.state" disabled>
        <el-option v-for="state in possibleStates" :key="state.value" :label="state.label" :value="state.value"></el-option>
      </el-select>
    </el-row>
    <el-row>
    </el-row>
    <vue-markdown style="min-height: 120px;" :source="form.description"></vue-markdown>
    <el-button v-if="form.state === 'unassigned'" type="primary" @click="assignTicket" :loading="assignLoading">Assign Ticket to Me</el-button>
    <div v-if="form.secondaryQuestions.data.length !== 0">
      <div class="divider"></div>
      <div v-for="(question, index) in form.secondaryQuestions.data" :key="question.id">
        <h3 style="margin-bottom: 0;">{{question.title}}</h3>
        <vue-markdown :source="question.description"></vue-markdown>
        <div style="height: 20px"></div>
        <div v-if="question.answer !== null">
          <vue-markdown class="secondary-answer" :source="question.answer"></vue-markdown>
          <div style="margin: 5px 0;" class="divider"></div>
        </div>
      </div>
    </div>
    <div v-if="form.state ==='assigned' || form.state === 'solved' || form.state === 'waiting_for_answers'">
      <h3>Answer</h3>

      <div v-if="form.state === 'solved'">
        <vue-markdown class="preview" :source="form.answer"></vue-markdown>
      </div>

      <el-form v-if="form.state === 'assigned' || form.state === 'waiting_for_answers'" :model="form" class="form">
        <el-form-item label="Title:" label-width="40px">
          <el-input v-model="form.questionTitle" :rows="5" placeholder="Title"></el-input>
        </el-form-item>
        <el-tabs type="card">
          <el-tab-pane label="Text">
            <el-input type="textarea" v-model="form.answer" :rows="5" placeholder="Description"></el-input>
          </el-tab-pane>
          <el-tab-pane label="Preview">
            <vue-markdown class="el-textarea el-textarea__inner preview" :source="form.answer"></vue-markdown>
          </el-tab-pane>
        </el-tabs>
        <el-button :loading="answerLoading" type="primary" @click="answerTicket" style="margin-top: 15px">Answer
        </el-button>
        <span v-if="$store.state.loggedInUserId === form.solverId">
          <span>or</span>
          <el-select v-model="deptId" placeholder="Select Department">
            <el-option
              v-for="item in $store.state.depts"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button :loading="sendingOtherDeptLoading" type="primary" @click="sendTicketOtherDept" style="margin-top: 15px">Send</el-button>
        </span>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import assign from 'lodash.assign'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'show-ticket',
  components: {
    VueMarkdown
  },
  data () {
    return {
      form: {
        title: '',
        description: '',
        state: 'unassigned',
        answer: '',
        solverId: null,
        questionTitle: '',
        createdAt: new Date(),
        secondaryQuestions: {
          total: 0,
          data: []
        },
        user: {
          name: '',
          email: ''
        }
      },
      preview: false,
      buttonText: 'Preview',
      possibleStates: [
        {
          value: 'unassigned',
          label: 'Unassigned'
        },
        {
          value: 'assigned',
          label: 'Assigned'
        },
        {
          value: 'waiting_for_answers',
          label: 'Waiting for answers'
        }, {
          value: 'solved',
          label: 'Solved'
        }
      ],
      assignLoading: false,
      answerLoading: false,
      sendingOtherDeptLoading: false,
      ticketId: null,
      deptId: null
    }
  },
  mounted: function () {
    this.ticketId = this.$route.params.id
    this.$root.$data.feathers.service('tickets').get(this.ticketId).then(result => {
      if (result.answer === null) {
        result.answer = ''
      }

      result.createdAt = new Date(result.createdAt)

      this.$set(this, 'form', result)
    })

    this.$root.$data.feathers.service('tickets').on('patched', this.ticketUpdate)
    this.$root.$data.feathers.service('secondary-questions').on('created', this.questionUpdate)
    this.$root.$data.feathers.service('secondary-questions').on('patched', this.questionUpdate)
  },
  methods: {
    ticketUpdate: function (newTicket) {
      assign(this.form, newTicket)
    },
    questionUpdate: function (newQuestion) {
      const questions = this.form.secondaryQuestions.data.filter(question => question.id === newQuestion.id)

      if (questions.length === 0) {
        this.form.secondaryQuestions.data.push(newQuestion)
        this.form.secondaryQuestions.total++
      } else {
        assign(questions[0], newQuestion)
      }
    },
    assignTicket: function () {
      this.signUpLoading = true
      this.$root.$data.feathers.service('tickets').patch(this.ticketId, {
        state: 'assigned'
      }).then(() => {
        this.assignLoading = false
        this.$message({
          type: 'success',
          message: 'Ticket assigned!',
          showClose: true
        })
        this.form.state = 'assigned'
        this.form.solverId = this.$store.state.loggedInUserId
      }).catch(() => {
        this.assignLoading = false
        this.$message({
          type: 'error',
          message: 'Error!',
          showClose: true
        })
      })
    },
    answerTicket: function () {
      this.answerLoading = true
      this.$root.$data.feathers.service('tickets').patch(this.ticketId, {
        state: 'solved',
        answer: this.form.answer
      }).then(() => {
        this.answerLoading = false
        this.$message({
          type: 'success',
          message: 'Ticket answered successfully!',
          showClose: true
        })
        this.form.state = 'solved'
      }).catch(() => {
        this.answerLoading = false
        this.$message({
          type: 'error',
          message: 'Error answering ticket. Please try again.',
          showClose: true
        })
      })
    },
    sendTicketOtherDept: function () {
      this.$root.$data.feathers.service('secondary-questions').create({
        title: this.form.questionTitle,
        description: this.form.answer,
        state: 'unassigned',
        ticketId: this.form.id,
        departmentId: this.deptId
      }).then(() => {
        this.sendingOtherDeptLoading = false
        this.$message({
          type: 'success',
          message: 'Ticket successfully sent to other department!',
          showClose: true
        })
        this.$root.$data.feathers.service('tickets').patch(this.ticketId, {
          state: 'waiting_for_answers'
        }).then(() => {
          this.form.state = 'waiting_for_answers'
        })
      }).catch(() => {
        this.sendingOtherDeptLoading = false
        this.$message({
          type: 'error',
          message: 'Error on sending the ticket to other department. Please try again.',
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

.secondary-answer {
  background-color: #F0F0F0; 
  padding: 2px 0 2px 10px; 
  border: 1px solid #F0F0F0; 
  border-radius: 4px;
}

.creator-name {
  color: grey;
  font-size: 75%;
}
</style>
