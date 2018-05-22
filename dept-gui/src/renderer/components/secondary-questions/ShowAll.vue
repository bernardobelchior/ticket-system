<template>
  <el-card class="show-card">
    <el-table :data="questions" style="width: 100%">
      <el-table-column label="Date" prop="date" :formatter="formatDate" sortable>
      </el-table-column>
      <el-table-column prop="title" label="Title" sortable>
      </el-table-column>
      <el-table-column label="State" prop="state" width="250" sortable :formatter="formatState">
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
          'waiting_for_answers': 'Waiting for answer',
          'solved': 'Solved'
        }
      }
    },
    methods: {
      showSecondaryQuestions: function (questionId) {
        this.$router.push('/secondary-questions/show/' + questionId)
      },
      getSecondaryQuestions: function () {
        console.log('pooling')
        this.$root.$data.feathers.service('secondary-questions').find().then(results => {
          this.$set(this, 'questions', results.data)
        })
      },
      formatDate: function (row) {
        return new Date(row.createdAt).toLocaleString()
      },
      formatState: function (row) {
        return this.possibleStates[row.state]
      }
    },
    mounted: function () {
      // setting secondary questions pooling
      setInterval(this.getSecondaryQuestions, 3000)
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
