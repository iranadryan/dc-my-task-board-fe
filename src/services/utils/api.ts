import axios, { AxiosError } from 'axios'
import { APIError } from '../../errors/APIError'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        const errorType = err.response.data.type as string

        if (errorType === 'validation') {
          const errors = err.response.data.errors as string[]

          throw new APIError('Validation error', errors)
        }

        const error = err.response.data.error as string

        throw new APIError(error)
      }
    }
  },
)
