import type { GraphQLContext } from '../../../main.ts'
import { NotFoundError } from '../../errors/NotFound.ts'

export async function findBook(
  _parent: undefined,
  args: { id: number },
  ctx: GraphQLContext
) {
  const book = await ctx.db.book.findFirst({
    where: { id: args.id },
    include: { authors: true },
  })

  if (!book) throw new NotFoundError('Book', args.id)
  return book
}
