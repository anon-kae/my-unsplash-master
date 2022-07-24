import ms from 'ms'

export default class HttpService {
  constructor (axios, store, serviceName = 'RootService') {
    this.axios = axios
    this.store = store
    this.serviceName = serviceName
    this.ttl = -1
    this.cacheKey = {}
  }

  /**
   * Set caching key for this instance
   * @param cacheKey
   */
  setCacheKey (cacheKey) {
    this.cacheKey = cacheKey
  }

  /**
   * Set caching TTL for this instance
   * @param {String|Number} ttl Cache TTL
   */
  setTTL (ttl) {
    if (typeof ttl === 'string') {
      ttl = ms(ttl) || 0
    }
    this.ttl = ttl
  }

  /**
   * (utils) create caching key in form of URLSearchPara
   *
   * @param method
   * @param url
   * @param cacheKey
   * @returns {string}
   */
  createCacheKey (method, url, cacheKey) {
    const fullCacheKey = {
      ...cacheKey,
      method,
      url,
    }

    const searchParams = new URLSearchParams(fullCacheKey)
    return searchParams.toString()
  }

  /**
   * Search and return data from cache, return null if not found
   * @param method
   * @param url
   * @param cacheKey
   * @returns {any|null}
   */
  handleCaching (method, url, cacheKey) {
    // create caching key using method, url, and other custom cache key
    const key = this.createCacheKey(method, url, cacheKey)

    // clear expired cache first
    this.store.commit('cache/clearExpiredCache', {
      serviceName: this.serviceName,
      url,
    })

    // get the caching array, just for shorten the line
    const cachingArray = this.store.state.cache[this.serviceName][url]

    // find cached data by created caching key, expired cache is already removed from above
    const cachedData = cachingArray.find((item) => item.key === key)

    // convert back to JSON before response to service
    return cachedData ? JSON.parse(cachedData.value) : null
  }

  /**
   * Add new data to cache
   * @param method
   * @param url
   * @param cacheKey
   * @param ttl
   * @param value
   */
  addToCache (method, url, cacheKey, ttl, value) {
    // create caching key using method, url, and other custom cache key
    const key = this.createCacheKey(method, url, cacheKey)

    // value is saved in JSON string
    value = JSON.stringify(value)

    // clear expired cache first
    this.store.commit('cache/clearExpiredCache', {
      serviceName: this.serviceName,
      url,
    })

    // save the cache with specified TTL
    this.store.commit('cache/setCache', {
      serviceName: this.serviceName,
      url,
      key,
      value,
      ttl,
    })
  }

  /**
   * Handle response data from server
   * @param request
   * @returns {Promise<*>}
   */
  async handleResponse (request) {
    const response = await request
    return response.data || response // data field is returned from api, not axios
  }

  /**
   * Perform HTTP GET, with cache if TTL > 0
   * @param url
   * @param config
   * @returns {Promise<*>}
   */
  async get (url, config) {
    // TTL > 0 means caching is enabled, try to find cached response before requesting to server
    if (this.ttl > 0) {
      const cachedData = this.handleCaching('GET', url, this.cacheKey)

      // response cache is saved as raw, need to process this response before returning to service
      if (cachedData) {
        return this.handleResponse(cachedData)
      }
    }

    // cache miss, get response from server
    const response = await this.axios.$get(url, config)

    // if caching enabled, add raw response to cache
    if (this.ttl > 0) {
      this.addToCache('GET', url, this.cacheKey, this.ttl, response)
    }

    // process the response before returning to service
    return this.handleResponse(response)
  }

  /**
   * Perform HTTP POST, with cache if TTL > 0
   * @param url
   * @param data
   * @param config
   * @returns {Promise<*>}
   */
  async post (url, data, config) {
    // TTL > 0 means caching is enabled, try to find cached response before requesting to server
    if (this.ttl > 0) {
      const cachedData = this.handleCaching('POST', url, this.cacheKey)

      // response cache is saved as raw, need to process this response before returning to service
      if (cachedData) {
        return this.handleResponse(cachedData)
      }
    }

    // cache miss, get response from server
    const response = await this.axios.$post(url, data, config)

    // if caching enabled, add raw response to cache
    if (this.ttl > 0) {
      this.addToCache('POST', url, this.cacheKey, this.ttl, response)
    }

    // process the response before returning to service
    return this.handleResponse(response)
  }

  /**
   * Perform HTTP DELETE, with cache if TTL > 0
   * @param url
   * @param config
   * @returns {Promise<*>}
   */
  async delete (url, config) {
    // TTL > 0 means caching is enabled, try to find cached response before requesting to server
    if (this.ttl > 0) {
      const cachedData = this.handleCaching('DELETE', url, this.cacheKey)

      // response cache is saved as raw, need to process this response before returning to service
      if (cachedData) {
        return this.handleResponse(cachedData)
      }
    }

    // cache miss, get response from server
    const response = await this.axios.$delete(url, config)

    // if caching enabled, add raw response to cache
    if (this.ttl > 0) {
      this.addToCache('DELETE', url, this.cacheKey, this.ttl, response)
    }

    // process the response before returning to service
    return this.handleResponse(response)
  }

  /**
   * Set authorization header
   * @param token
   */
  setAuthenticationToken (token) {
    this.axios.setHeader('Authorization', `Bearer ${token}`)
  }

  /**
   * Create a new instance of HttpService for the specific service name
   * This service name is used for caching purpose
   * @param serviceName
   * @returns {HttpService}
   */
  createInstanceForServiceName (serviceName = 'RootService') {
    return new HttpService(this.axios, this.store, serviceName)
  }

  /**
   * Create a new instance of HttpService with current service name, but different caching parameter
   * @param cacheKey
   * @param ttl
   * @returns {HttpService}
   */
  cache (cacheKey = {}, ttl = 300000) {
    const newService = new HttpService(this.axios, this.store, this.serviceName)

    if (process.env.CLIENT_HTTP_CACHE_DISABLE !== 'true') {
      console.debug('setting cache...')
      newService.setCacheKey(cacheKey)
      newService.setTTL(ttl)
    }

    return newService
  }
}
