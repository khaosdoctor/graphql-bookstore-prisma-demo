import type { GraphQLContext } from '../../../main.ts'

export async function removeAuthor(
  _parent: undefined,
  args: { id: number },
  ctx: GraphQLContext
): Promise<void> {
  ctx.db
    .$transaction([
      ctx.db.authorsBooks.deleteMany({ where: { authorId: args.id } }),
      ctx.db.author.delete({ where: { id: args.id } }),
    ])
    // Prisma returns an error if it cannot find the book, if it has already been deleted
    // we silently catch the error and ifnore it
    .catch(() => {})
}
