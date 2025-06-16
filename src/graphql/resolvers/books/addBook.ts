import type { Book } from '../../../generated/prisma/index.js'
import type { GraphQLContext } from '../../../main.ts'
import { findAuthor } from '../author/findAuthor.ts'

export async function addBook(
  _parent: undefined,
  args: Pick<Book, 'pages' | 'title'> & { authors: number[] },
  ctx: GraphQLContext
) {
  return ctx.db.$transaction(async () => {
    const book = await ctx.db.book.create({
      data: {
        title: args.title,
        pages: args.pages,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    })

    await ctx.db.authorsBooks.createMany({
      data: await Promise.all(
        args.authors.map(async (authorId) => {
          await findAuthor(_parent, { id: authorId }, ctx)
          return { authorId, bookId: book.id }
        })
      ),
    })

    return ctx.db.book.findUnique({
      where: { id: book.id },
      include: { authors: true },
    })
  })
}
