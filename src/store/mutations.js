const mutations = {
  save_userId (state, userId) {
    state.userId = userId
  },
  save_type (state,type) {
    state.type = type
  },
  save_jobNum (state,jobNumber) {
    state.jobNumber = jobNumber
  },
  arr_flag (state,arrflag) {
    state.arrflag = arrflag
  },
  scroll_top (state,scrollTop) {
    state.scrollTop = scrollTop
  },
}

export default mutations