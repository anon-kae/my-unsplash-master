const BASE_API_URL = process.env.BASE_API_URL

export default function (httpService, app, store) {
  return {
    findAll ({ keyword, page, size }) {
      const params = new URLSearchParams()
      if (keyword) params.append('keyword', keyword)
      if (page) params.append('page', page)
      if (size) params.append('size', size)

      return httpService.get(`${BASE_API_URL}/upload?${params.toString()}`)
    },
    createPhoto ({ label, photoUrl }) {
      return httpService.post(`${BASE_API_URL}/upload`, { label, photoUrl })
    },
    deletePhoto (id) {
      const params = new URLSearchParams()
      if (id) params.append('id', id)
      return httpService.delete(`${BASE_API_URL}/upload?${params}`)
    },
  }
}
