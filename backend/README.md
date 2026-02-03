# Backend (Placeholder)

## Status

⚠️ **NOT IMPLEMENTED YET** ⚠️

This directory is a placeholder for the backend implementation of the Sakura theme API.

## Overview

The backend should implement a RESTful API to serve content to the frontend Vue 3 application. This API will handle:

- Posts management (CRUD operations)
- Pages management
- Tags and categories
- User authentication and authorization
- Site configuration
- Comments
- Search functionality
- File uploads

## Recommended Technology Stacks

### Option 1: Spring Boot (Java) - Recommended for Halo Integration

**Pros:**
- Seamless integration with existing Halo CMS (which is built on Spring Boot)
- Strong typing with Java
- Extensive ecosystem and libraries
- Production-ready with excellent tooling

**Getting Started:**
```bash
# Create Spring Boot project with Spring Initializr
# Include dependencies:
# - Spring Web
# - Spring Data JPA
# - Spring Security
# - PostgreSQL Driver (or MySQL)
# - JWT Library

# Run
./gradlew bootRun
```

**Key Dependencies:**
- `spring-boot-starter-web`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-security`
- `jjwt` (for JWT authentication)
- Database driver (PostgreSQL, MySQL, etc.)

### Option 2: Node.js with Express (JavaScript/TypeScript)

**Pros:**
- JavaScript/TypeScript on both frontend and backend
- Fast development
- Large ecosystem (npm)
- Good for real-time features with WebSockets

**Getting Started:**
```bash
npm init -y
npm install express jsonwebtoken bcrypt pg sequelize cors dotenv

# Run
node server.js
# or with TypeScript
npm install -D typescript @types/node @types/express ts-node
npx ts-node src/server.ts
```

**Key Dependencies:**
- `express` - Web framework
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `sequelize` or `typeorm` - ORM
- `pg` or `mysql2` - Database driver
- `cors` - CORS middleware

### Option 3: FastAPI (Python)

**Pros:**
- Modern, fast Python framework
- Automatic API documentation (Swagger)
- Type hints support
- Fast development

**Getting Started:**
```bash
pip install fastapi uvicorn sqlalchemy pyjwt python-jose

# Run
uvicorn main:app --reload
```

**Key Dependencies:**
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `sqlalchemy` - ORM
- `pyjwt` - JWT authentication
- `python-jose` - JWT with encryption
- `passlib` - Password hashing

## API Design

Please refer to the comprehensive API design document:

📄 **[API Design Documentation](../docs/design.md)**

The design document includes:
- Complete API endpoint specifications
- Request/response examples
- Authentication flow
- Data models
- Error handling
- Pagination and filtering
- CORS configuration
- Security considerations
- Deployment guidelines

## Database Schema

The backend should implement the following core tables:

### Posts
- id (PK)
- title
- slug (unique)
- excerpt
- content
- cover_url
- author_id (FK to Users)
- created_at
- updated_at
- published_at
- views
- likes
- status (enum: draft, published, archived)

### Pages
- id (PK)
- title
- slug (unique)
- content
- cover_url
- template
- created_at
- updated_at
- status

### Tags
- id (PK)
- name
- slug (unique)
- description

### Categories
- id (PK)
- name
- slug (unique)
- description
- parent_id (FK to Categories, nullable)

### Users
- id (PK)
- name
- email (unique)
- password_hash
- avatar_url
- bio
- website
- role (enum: admin, editor, author, subscriber)
- created_at

### PostTags (Many-to-Many)
- post_id (FK to Posts)
- tag_id (FK to Tags)

### PostCategories (Many-to-Many)
- post_id (FK to Posts)
- category_id (FK to Categories)

### Comments
- id (PK)
- post_id (FK to Posts)
- author_name
- author_email
- author_website
- content
- parent_id (FK to Comments, nullable)
- created_at
- status (enum: pending, approved, spam)

### SiteConfig
- key (PK)
- value (JSON or TEXT)

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
PORT=8090
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sakura_db
# or for MySQL
# DATABASE_URL=mysql://user:password@localhost:3306/sakura_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=86400

# CORS
CORS_ORIGIN=http://localhost:3000

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760

# Redis (optional, for caching)
# REDIS_URL=redis://localhost:6379
```

## Implementation Checklist

- [ ] Initialize project with chosen technology stack
- [ ] Set up database connection
- [ ] Implement database models/entities
- [ ] Create database migrations
- [ ] Implement authentication (JWT)
- [ ] Implement authorization middleware
- [ ] Create API endpoints for Posts (CRUD)
- [ ] Create API endpoints for Pages (CRUD)
- [ ] Create API endpoints for Tags
- [ ] Create API endpoints for Categories
- [ ] Create API endpoints for Users
- [ ] Create API endpoints for Comments
- [ ] Implement search functionality
- [ ] Implement file upload
- [ ] Add input validation
- [ ] Add error handling
- [ ] Implement rate limiting
- [ ] Add logging
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Set up CI/CD pipeline
- [ ] Prepare for deployment

## Development Workflow

1. **Install dependencies** based on chosen stack
2. **Set up database** (PostgreSQL, MySQL, or MongoDB)
3. **Configure environment variables**
4. **Run migrations** to create database schema
5. **Seed database** with sample data (optional)
6. **Start development server**
7. **Test API endpoints** using Postman or similar tool
8. **Connect frontend** to backend API

## Testing the API

Once implemented, test the API with:

### Using cURL
```bash
# Health check
curl http://localhost:8090/health

# Get posts
curl http://localhost:8090/api/posts

# Login
curl -X POST http://localhost:8090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

### Using Postman
Import the API collection from `docs/design.md` or create requests based on the API specification.

## Deployment

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
# or
# FROM openjdk:17-alpine
# or
# FROM python:3.11-alpine

WORKDIR /app
COPY . .
RUN npm install --production
# or for Java: ./gradlew build
# or for Python: pip install -r requirements.txt

EXPOSE 8090
CMD ["npm", "start"]
# or: java -jar build/libs/app.jar
# or: uvicorn main:app --host 0.0.0.0 --port 8090
```

### Using Docker Compose

Add backend service to `docker-compose.yaml`:
```yaml
services:
  backend:
    build: ./backend
    ports:
      - "8090:8090"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/sakura
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=sakura
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Resources

### Learning Resources
- **Spring Boot**: https://spring.io/guides
- **Express.js**: https://expressjs.com/
- **FastAPI**: https://fastapi.tiangolo.com/

### Halo CMS Integration
- **Halo Documentation**: https://docs.halo.run/
- **Halo GitHub**: https://github.com/halo-dev/halo

## Contributing

When implementing the backend, please:

1. Follow the API design specification in `docs/design.md`
2. Write clean, documented code
3. Include unit and integration tests
4. Update this README with actual implementation details
5. Add API documentation (Swagger/OpenAPI)
6. Ensure security best practices

## Support

For questions or issues:
- Check `docs/design.md` for API specifications
- Open an issue on GitHub
- Contact the development team

---

**Note**: This is a placeholder. Once backend is implemented, update this README with actual implementation details, setup instructions, and deployment guidelines.
