import type { GraphQLContext } from '../../../main.ts'
import { NotFoundError } from '../../errors/NotFound.ts'

export async function findAuthor(
  _parent: undefined,
  args: { id: number },
  ctx: GraphQLContext
) {
  const author = await ctx.db.author.findFirst({
    where: { id: args.id },
    include: { books: true },
  })

  if (!author) throw new NotFoundError('Author', args.id)
  return author
}
