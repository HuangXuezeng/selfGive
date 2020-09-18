const mutations = {
  save_userId (state, userId) {
    state.userId = userId
  },
  save_type (state,type) {
    state.type = type
  },
  save_jobNum (state,jobNumber) {
    state.jobNumber = jobNumber
  }
}

export default mutations