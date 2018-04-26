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
          state: 'unassigned'
        },
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
        ]
      }
    },
    mounted: function () {
      const ticketId = this.$route.params.id
      this.$root.$data.feathers.service('tickets').get(ticketId).then(result => {
        this.$set(this, 'form', result)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .show-card {
    max-width: 800px;
    margin: auto;
  }
</style>
