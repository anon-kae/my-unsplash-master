import { UploadService } from '../services'
import HttpService from '../services/HttpService'

const apiFactory = (httpService, app, store) => {
  // define services here, it will be constructed later
  const services = {
    uploadService: UploadService,
  }

  // construct each service with own httpService instance, name passed to this instance will be a part of caching key
  for (const [name, ServiceFactory] of Object.entries(services)) {
    const ownHttpService = httpService.createInstanceForServiceName(name)
    services[name] = ServiceFactory(ownHttpService, app, store)
  }

  return services
}

export default ({ $axios, app, store }, inject) => {
  const httpService = new HttpService($axios.create(), store)
  const api = apiFactory(httpService, app, store)
  inject('api', api)
}
