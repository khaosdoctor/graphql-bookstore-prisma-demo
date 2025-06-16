import type { GraphQLContext } from '../../../main.ts'

export async function listBooks(
  _parent: unknown,
  _args: unknown,
  ctx: GraphQLContext
) {
  return ctx.db.book.findMany({ include: { authors: true } })
}
