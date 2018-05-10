<template>
  <el-card class="show-card">
    <el-table :data="questions" style="width: 100%">
      <el-table-column prop="title" label="Title">
      </el-table-column>
      <el-table-column label="State" width="250">
        <template slot-scope="scope">
          <span>{{possibleStates[scope.row.state]}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Show" width="100">
        <template slot-scope="scope">
          <el-button @click="showSecondaryQuestions(scope.row.id)">Show</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: 'show-all-secondary-questions',
    data () {
      return {
        questions: [],
        possibleStates: {
          'unassigned': 'Unassigned',
          'assigned': 'Assigned',
          'waiting_for_answers': 'Waiting for answers',
          'solved': 'Solved'
        }
      }
    },
    methods: {
      showSecondaryQuestions: function (questionId) {
        this.$router.push('/secondary-questions/show/' + questionId)
      }
    },
    mounted: function () {
      this.$root.$data.feathers.service('secondary-questions').find().then(results => {
        this.$set(this, 'questions', results.data)
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
