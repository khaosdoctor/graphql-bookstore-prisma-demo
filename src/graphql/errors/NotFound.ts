import { GraphQLError } from 'graphql'

export class NotFoundError extends GraphQLError {
  constructor(entity: string, identifier: unknown) {
    super(`Could not find ${entity} with identifier: ${identifier}`, {
      extensions: {
        code: 'NOT_FOUND',
        http: {
          // I know this is not the "recommended" way to return errors in GraphQL,
          // but it makes me really uneasy to return 200 for a not found error.
          status: 404,
        },
      },
    })
  }
}
