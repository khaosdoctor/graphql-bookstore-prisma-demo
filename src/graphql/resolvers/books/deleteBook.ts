import type { GraphQLContext } from '../../../main.ts'

export async function removeBook(
  _parent: undefined,
  args: { id: number },
  ctx: GraphQLContext
): Promise<void> {
  ctx.db
    .$transaction([
      ctx.db.authorsBooks.deleteMany({ where: { bookId: args.id } }),
      ctx.db.book.delete({ where: { id: args.id } }),
    ])
    // Prisma returns an error if it cannot find the book, if it has already been deleted
    // we silently catch the error and ifnore it
    .catch(() => {})
}
