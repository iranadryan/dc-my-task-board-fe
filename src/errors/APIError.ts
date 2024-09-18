export class APIError extends Error {
  validationErrors?: string[]

  constructor(message: string, validationErrors?: string[]) {
    super(message)
    super.name = 'APIError'
    this.validationErrors = validationErrors
  }
}
