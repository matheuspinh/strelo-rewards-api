export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail já cadastrado.')
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('E-mail e/ou senha incorretos.')
  }
}

export class UserUnauthorizedError extends Error {
  constructor() {
    super('Usuário não autorizado.')
  }
}
