import type { GraphQLContext } from '../../../main.ts'

export async function listAuthors(
  _parent: unknown,
  _args: unknown,
  ctx: GraphQLContext
) {
  return ctx.db.author.findMany({ include: { books: true } })
}
