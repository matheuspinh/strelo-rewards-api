export class ResourceNotFound extends Error {
  constructor(message: string = 'Resource not found') {
    super(message)
  }
}

export class DatabaseError extends Error {
  constructor(message: string = 'Erro de banco de dados') {
    super(message)
  }
}