<template>
  <el-card class="show-card">
    <el-row slot="header" type="flex" justify="space-between">
      <h2 style="margin:10px 0 0 0">{{form.title}}</h2>
      <el-select v-model="form.state" disabled>
        <el-option v-for="state in possibleStates" :key="state.value" :label="state.label"
                   :value="state.value"></el-option>
      </el-select>
    </el-row>
    <vue-markdown style="min-height: 120px;" :source="form.description"></vue-markdown>
    <el-button v-if="form.state === 'unassigned'" type="primary" @click="assignTicket" :loading="assignLoading">Assign
      Ticket to Me
    </el-button>
    <div v-if="form.state ==='assigned' || form.state === 'solved'">
      <div class="divider"></div>
      <h3>Answer</h3>

      <div v-if="form.state === 'solved'">
        <vue-markdown class="preview" :source="form.answer"></vue-markdown>
      </div>

      <el-form v-if="form.state === 'assigned'" :model="form" class="form">
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
        <el-button v-if="$store.state.loggedInUserId === form.solverId" :loading="sendingOtherDeptLoading" type="primary" @click="sendTicketOtherDept" style="margin-top: 15px">Send to Other Dept
        </el-button>
      </el-form>

    </div>
  </el-card>
</template>

<script>
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
          answer: ''
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
        ticketId: null
      }
    },
    mounted: function () {
      this.ticketId = this.$route.params.id
      this.$root.$data.feathers.service('tickets').get(this.ticketId).then(result => {
        this.$set(this, 'form', result)
      })
    },
    methods: {
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
          title: this.form.title,
          description: this.form.description,
          state: 'unassigned',
          ticketId: this.form.id
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
</style>
