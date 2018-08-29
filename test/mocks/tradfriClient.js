

module.exports = {
  authenticate: (secret) => {
    if (secret === 'validSecret') {
      return Promise.resolve({identity: 'validIdentity', psk: 'validPsk'})
    } else {
      return Promise.reject(new Error('Invalid secret'))
    }
  }
}