import type { GraphQLContext } from '../../../main.ts'
import { findBook } from './findBook.ts'

export async function updateBook(
  _parent: undefined,
  args: { id: number; title?: string; authors?: number[]; pages?: number },
  ctx: GraphQLContext
) {
  const book = await findBook(_parent, args, ctx)
  // Create a list of operations to update the authorsBooks relation
  const relationUpdateArray = [
    ctx.db.authorsBooks.deleteMany({ where: { bookId: args.id } }),
    ctx.db.authorsBooks.createMany({
      data:
        args.authors?.map((authorId) => ({
          bookId: args.id,
          authorId: authorId,
        })) ?? [],
    }),
  ]

  const result = await ctx.db.$transaction([
    // But only if authors are provided, otherwise skip the relation update
    ...(args.authors ? relationUpdateArray : []),
    ctx.db.book.update({
      where: { id: args.id },
      data: {
        title: args.title ?? book.title,
        pages: args.pages ?? book.pages,
      },
      include: { authors: true },
    }),
  ])
  return result[2]
}
