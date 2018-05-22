const serverToken = '3DF1A7FF-F69D-9545-7EE1-43CE710EA0F1'

const verifyServerToken = context => {
  return context.data && context.data.token === serverToken 
}

module.exports = {
  verifyServerToken
}
