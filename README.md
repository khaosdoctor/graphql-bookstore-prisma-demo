# GraphQL Bookstore with Prisma example

> This is a small **experimental** example of a GraphQL Bookstore using Prisma.

The intent of this application is to demonstrate how to use Prisma with GraphQL
in a simple bookstore application. It's **not** meant to be a production-ready
application.

_This application will not be maintained or updated in the future._

## Tech Stack

- **Node.js** with TypeScript
- **GraphQL** with Apollo Server
- **Prisma** ORM with PostgreSQL
- **Express** for HTTP server
- **Docker Compose** for database setup

## Prerequisites

- Node.js (v22+)
- Docker and Docker Compose
- npm

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/khaosdoctor/graphql-bookstore-prisma-demo.git
   cd graphql-bookstore-prisma-demo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the database**

   ```bash
   docker-compose up -d
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://root:root@localhost:5432/bookstore"
   ```

5. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

6. **Generate Prisma client**

   ```bash
   npx prisma generate
   ```

## Running

1. **Start the development server**

   ```bash
   npm start
   ```

2. **Access GraphQL Playground**
   Open your browser and navigate to `http://localhost:4000/graphql`

## Project Structure

```
src/
├── generated/           # Generated Prisma client (ignored until generate is run)
├── graphql/
│   ├── errors/         # Custom GraphQL errors
│   ├── resolvers/      # GraphQL resolvers
│   │   ├── author/     # Author-related resolvers
│   │   └── books/      # Book-related resolvers
│   └── schema.ts       # GraphQL schema definition
└── main.ts             # Application entry point

prisma/
├── migrations/         # Database migrations
└── schema.prisma       # Prisma schema
```

## Example Queries

### Get all books with their authors

```graphql
query {
  books {
    id
    title
    pages
    authors {
      id
      name
      birthDate
    }
  }
}
```

### Add a new book

```graphql
mutation {
  addBook(title: "The Great Gatsby", authors: [1], pages: 180) {
    id
    title
    pages
    authors {
      name
    }
  }
}
```

### Add a new author

```graphql
mutation {
  addAuthor(name: "F. Scott Fitzgerald", birthDate: "1896-09-24") {
    id
    name
    birthDate
  }
}
