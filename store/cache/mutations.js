import vue, { set } from 'vue'
import generateState from './state'

export default {
  setCache (state, { serviceName, url, key, value, ttl = 300000 }) {
    if (!state[serviceName]) {
      set(state, serviceName, {})
    }
    if (!state[serviceName][url]) {
      set(state[serviceName], url, [])
    }

    if (Array.isArray(state[serviceName][url])) {
      state[serviceName][url].push({
        key,
        value,
        expiredAt: Date.now() + ttl,
      })
    }
  },
  clearExpiredCache (state, { serviceName, url }) {
    if (!state[serviceName]) {
      set(state, serviceName, {})
    }
    if (!state[serviceName][url]) {
      set(state[serviceName], url, [])
    }

    const now = Date.now()
    state[serviceName][url] = state[serviceName][url].filter(
      ({ expiredAt }) => expiredAt > now
    )
  },
  clearCache (state) {
    const newState = generateState()

    Object.keys(state).forEach((serviceName) => {
      vue.delete(state, serviceName)
    })

    Object.assign(state, newState)
  },
}
