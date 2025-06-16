import type { Author } from '../../../generated/prisma/index.js'
import type { GraphQLContext } from '../../../main.ts'

export async function addAuthor(
  _parent: undefined,
  args: Pick<Author, 'name' | 'birthDate'>,
  ctx: GraphQLContext
) {
  return ctx.db.author.create({
    data: { name: args.name, birthDate: args.birthDate ?? null },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  })
}
