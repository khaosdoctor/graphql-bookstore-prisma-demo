import type { GraphQLContext } from '../../../main.ts'
import { findAuthor } from './findAuthor.ts'

export async function updateAuthor(
  _parent: undefined,
  args: { id: number; name?: string; birthDate?: string; books?: number[] },
  ctx: GraphQLContext
) {
  const author = await findAuthor(_parent, args, ctx)

  // Create a list of operations to update the authorsBooks relation
  const relationUpdateArray = [
    ctx.db.authorsBooks.deleteMany({ where: { authorId: args.id } }),
    ctx.db.authorsBooks.createMany({
      data:
        args.books?.map((bookId) => ({
          bookId,
          authorId: args.id,
        })) ?? [],
    }),
  ]
  const result = await ctx.db.$transaction([
    // But only if books are provided, otherwise skip the relation update
    ...(args.books ? relationUpdateArray : []),
    ctx.db.author.update({
      where: { id: args.id },
      data: {
        name: args.name ?? author.name,
        birthDate: args.birthDate ?? author.birthDate,
      },
      include: { books: true },
    }),
  ])

  console.log(result)
  return result[2]
}
