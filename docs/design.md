# API Design Documentation

## Overview

This document describes the REST API design for the Sakura theme backend. The API follows RESTful principles and uses JSON for request/response payloads.

## Architecture

The architecture consists of:

1. **Frontend**: Vue 3 + TypeScript + Vite application (located in `frontend/`)
2. **Backend**: To be implemented (placeholder in `backend/`) - suggested technologies:
   - Option 1: Spring Boot (Java) - for integration with existing Halo CMS
   - Option 2: Node.js + Express (JavaScript/TypeScript)
   - Option 3: FastAPI (Python)
3. **Database**: PostgreSQL/MySQL/MongoDB (based on backend choice)
4. **Cache**: Redis (optional, for performance)

### Communication Flow

```
Client (Browser)
    ↓
Frontend (Vue 3 App on port 3000)
    ↓
HTTP REST API (/api/*)
    ↓
Backend Server (port 8090)
    ↓
Database
```

## Base URL

- **Development**: `http://localhost:8090/api`
- **Production**: `https://api.yourdomain.com` or `https://yourdomain.com/api`

## Authentication

### JWT Token-Based Authentication

The API uses JSON Web Tokens (JWT) for authentication.

#### Authentication Flow

1. User logs in with credentials
2. Server validates and returns JWT token
3. Client stores token (localStorage/sessionStorage)
4. Client includes token in subsequent requests via `Authorization` header

#### Request Headers

```http
Authorization: Bearer <jwt_token>
```

### Authentication Endpoints

#### Login

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400,
  "user": {
    "id": "user-123",
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://example.com/avatars/user-123.jpg"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": {
    "code": "AUTH_FAILED",
    "message": "Invalid email or password"
  }
}
```

#### Logout

```http
POST /api/auth/logout
```

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

#### Refresh Token

```http
POST /api/auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "refresh_token_value"
}
```

**Response (200 OK):**
```json
{
  "token": "new_jwt_token",
  "expiresIn": 86400
}
```

## Data Models

### Post

```typescript
{
  id: string;              // Unique identifier
  title: string;           // Post title
  slug: string;            // URL-friendly version of title
  excerpt?: string;        // Short summary (optional)
  content: string;         // Full post content (HTML or Markdown)
  cover?: string;          // Cover image URL (optional)
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags: Tag[];            // Associated tags
  categories: Category[]; // Associated categories
  createdAt: string;      // ISO 8601 timestamp
  updatedAt: string;      // ISO 8601 timestamp
  publishedAt: string;    // ISO 8601 timestamp
  views: number;          // View count
  likes: number;          // Like count
  status: "draft" | "published" | "archived";
}
```

### Page

```typescript
{
  id: string;
  title: string;
  slug: string;
  content: string;
  cover?: string;
  template?: string;      // Custom template name (e.g., "links")
  createdAt: string;
  updatedAt: string;
  status: "draft" | "published";
}
```

### Tag

```typescript
{
  id: string;
  name: string;
  slug: string;
  count: number;          // Number of posts with this tag
  description?: string;
}
```

### Category

```typescript
{
  id: string;
  name: string;
  slug: string;
  count: number;          // Number of posts in this category
  description?: string;
  parent?: string;        // Parent category ID (for nested categories)
}
```

### User

```typescript
{
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  website?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    // ... other social links
  };
  role: "admin" | "editor" | "author" | "subscriber";
  createdAt: string;
}
```

### SiteConfig

```typescript
{
  title: string;
  subtitle?: string;
  description?: string;
  logo?: string;
  favicon?: string;
  url: string;
  language: string;
  timezone: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    email?: string;
    // ... other platforms
  };
  analytics?: {
    google?: string;
    baidu?: string;
  };
  seo?: {
    keywords?: string[];
    author?: string;
  };
}
```

### Comment

```typescript
{
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
    website?: string;
  };
  content: string;
  parentId?: string;      // For nested comments/replies
  createdAt: string;
  status: "pending" | "approved" | "spam";
}
```

## Pagination

All list endpoints support pagination with the following query parameters:

- `page`: Page number (default: 1, min: 1)
- `size`: Items per page (default: 10, min: 1, max: 100)

### Pagination Response Format

```json
{
  "items": [...],          // Array of items
  "total": 100,            // Total number of items
  "page": 1,               // Current page
  "size": 10,              // Items per page
  "totalPages": 10         // Total number of pages
}
```

## Filtering and Sorting

### Query Parameters

- `sort`: Field to sort by (e.g., `createdAt`, `views`, `title`)
- `order`: Sort order (`asc` or `desc`, default: `desc`)
- `status`: Filter by status (e.g., `published`, `draft`)
- `tag`: Filter by tag slug
- `category`: Filter by category slug
- `author`: Filter by author ID
- `q`: Search query (searches in title, content, etc.)

### Example

```http
GET /api/posts?page=1&size=20&sort=views&order=desc&status=published&tag=vue-js
```

## API Endpoints

### Posts

#### List Posts

```http
GET /api/posts
```

**Query Parameters:**
- `page` (number): Page number
- `size` (number): Items per page
- `sort` (string): Sort field
- `order` (string): Sort order
- `status` (string): Filter by status
- `tag` (string): Filter by tag
- `category` (string): Filter by category

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "post-1",
      "title": "Welcome to Sakura Theme",
      "slug": "welcome-to-sakura-theme",
      "excerpt": "This is the first post...",
      "cover": "https://cdn.example.com/covers/post-1.jpg",
      "author": {
        "id": "user-1",
        "name": "Admin",
        "avatar": "https://cdn.example.com/avatars/user-1.jpg"
      },
      "tags": [
        { "id": "tag-1", "name": "Vue.js", "slug": "vue-js", "count": 10 }
      ],
      "categories": [
        { "id": "cat-1", "name": "Technology", "slug": "technology", "count": 20 }
      ],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "publishedAt": "2024-01-01T00:00:00Z",
      "views": 100,
      "likes": 10,
      "status": "published"
    }
  ],
  "total": 100,
  "page": 1,
  "size": 10,
  "totalPages": 10
}
```

#### Get Single Post

```http
GET /api/posts/:id
```

**Response (200 OK):**
```json
{
  "id": "post-1",
  "title": "Welcome to Sakura Theme",
  "slug": "welcome-to-sakura-theme",
  "content": "<p>Full post content in HTML...</p>",
  "cover": "https://cdn.example.com/covers/post-1.jpg",
  "author": {
    "id": "user-1",
    "name": "Admin",
    "avatar": "https://cdn.example.com/avatars/user-1.jpg"
  },
  "tags": [...],
  "categories": [...],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "publishedAt": "2024-01-01T00:00:00Z",
  "views": 100,
  "likes": 10,
  "status": "published"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": {
    "code": "POST_NOT_FOUND",
    "message": "Post with id 'post-1' not found"
  }
}
```

#### Get Post by Slug

```http
GET /api/posts/slug/:slug
```

**Response:** Same as Get Single Post

#### Create Post (Authenticated)

```http
POST /api/posts
```

**Headers:**
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Post Title",
  "slug": "new-post-title",
  "excerpt": "Short summary...",
  "content": "<p>Full content...</p>",
  "cover": "https://cdn.example.com/covers/new-post.jpg",
  "tags": ["tag-1", "tag-2"],
  "categories": ["cat-1"],
  "status": "published"
}
```

**Response (201 Created):**
```json
{
  "id": "post-new",
  "title": "New Post Title",
  ...
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

**Error Response (422 Unprocessable Entity):**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "title": "Title is required",
      "content": "Content is required"
    }
  }
}
```

#### Update Post (Authenticated)

```http
PUT /api/posts/:id
PATCH /api/posts/:id
```

**Headers:**
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:** Same as Create Post (fields are optional for PATCH)

**Response (200 OK):**
```json
{
  "id": "post-1",
  "title": "Updated Title",
  ...
}
```

#### Delete Post (Authenticated)

```http
DELETE /api/posts/:id
```

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Response (204 No Content)**

### Pages

#### List Pages

```http
GET /api/pages
```

**Query Parameters:** Same as List Posts

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "page-1",
      "title": "About",
      "slug": "about",
      "cover": "https://cdn.example.com/covers/about.jpg",
      "template": null,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "status": "published"
    }
  ],
  "total": 5,
  "page": 1,
  "size": 10,
  "totalPages": 1
}
```

#### Get Single Page

```http
GET /api/pages/:id
```

#### Get Page by Slug

```http
GET /api/pages/slug/:slug
```

**Response (200 OK):**
```json
{
  "id": "page-1",
  "title": "About",
  "slug": "about",
  "content": "<p>About page content...</p>",
  "cover": "https://cdn.example.com/covers/about.jpg",
  "template": null,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "status": "published"
}
```

#### Create/Update/Delete Page (Authenticated)

Similar to Posts endpoints with authentication required.

### Tags

#### List All Tags

```http
GET /api/tags
```

**Response (200 OK):**
```json
[
  {
    "id": "tag-1",
    "name": "Vue.js",
    "slug": "vue-js",
    "count": 10,
    "description": "Vue.js related posts"
  },
  {
    "id": "tag-2",
    "name": "TypeScript",
    "slug": "typescript",
    "count": 8
  }
]
```

#### Get Single Tag

```http
GET /api/tags/:slug
```

**Response (200 OK):**
```json
{
  "id": "tag-1",
  "name": "Vue.js",
  "slug": "vue-js",
  "count": 10,
  "description": "Vue.js related posts"
}
```

#### Get Posts by Tag

```http
GET /api/tags/:slug/posts
```

**Query Parameters:** Same as List Posts

**Response (200 OK):**
```json
{
  "items": [...],  // Array of posts with this tag
  "total": 10,
  "page": 1,
  "size": 10,
  "totalPages": 1
}
```

### Categories

#### List All Categories

```http
GET /api/categories
```

**Response (200 OK):**
```json
[
  {
    "id": "cat-1",
    "name": "Technology",
    "slug": "technology",
    "count": 20,
    "description": "Technology articles",
    "parent": null
  },
  {
    "id": "cat-2",
    "name": "Frontend",
    "slug": "frontend",
    "count": 15,
    "parent": "cat-1"
  }
]
```

#### Get Single Category

```http
GET /api/categories/:slug
```

#### Get Posts by Category

```http
GET /api/categories/:slug/posts
```

**Query Parameters:** Same as List Posts

### Site Configuration

#### Get Site Configuration

```http
GET /api/site/config
```

**Response (200 OK):**
```json
{
  "title": "Sakura Theme",
  "subtitle": "A beautiful blog theme",
  "description": "Halo version of Sakura theme",
  "logo": "https://cdn.example.com/logo.png",
  "favicon": "https://cdn.example.com/favicon.ico",
  "url": "https://example.com",
  "language": "en-US",
  "timezone": "Asia/Shanghai",
  "socialLinks": {
    "github": "https://github.com/username",
    "twitter": "https://twitter.com/username",
    "email": "admin@example.com"
  },
  "analytics": {
    "google": "UA-XXXXXXXXX-X"
  },
  "seo": {
    "keywords": ["blog", "sakura", "halo"],
    "author": "Admin"
  }
}
```

#### Update Site Configuration (Authenticated, Admin only)

```http
PUT /api/site/config
```

### Users

#### Get User Profile

```http
GET /api/users/:id
```

**Response (200 OK):**
```json
{
  "id": "user-1",
  "name": "Admin",
  "email": "admin@example.com",
  "avatar": "https://cdn.example.com/avatars/user-1.jpg",
  "bio": "Site administrator and content creator",
  "website": "https://example.com",
  "socialLinks": {
    "github": "https://github.com/admin"
  },
  "role": "admin",
  "createdAt": "2023-01-01T00:00:00Z"
}
```

### Search

#### Search Posts

```http
GET /api/search/posts
```

**Query Parameters:**
- `q` (string, required): Search query
- `page` (number): Page number
- `size` (number): Items per page

**Response (200 OK):**
```json
{
  "items": [...],  // Array of matching posts
  "total": 5,
  "page": 1,
  "size": 10,
  "totalPages": 1,
  "query": "vue"
}
```

### Comments

#### List Comments for Post

```http
GET /api/posts/:id/comments
```

**Query Parameters:**
- `page` (number): Page number
- `size` (number): Items per page
- `status` (string): Filter by status

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "comment-1",
      "postId": "post-1",
      "author": {
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://cdn.example.com/avatars/john.jpg",
        "website": "https://johndoe.com"
      },
      "content": "Great post!",
      "parentId": null,
      "createdAt": "2024-01-02T10:30:00Z",
      "status": "approved"
    }
  ],
  "total": 5,
  "page": 1,
  "size": 10,
  "totalPages": 1
}
```

#### Create Comment

```http
POST /api/posts/:id/comments
```

**Request Body:**
```json
{
  "author": {
    "name": "John Doe",
    "email": "john@example.com",
    "website": "https://johndoe.com"
  },
  "content": "Great post!",
  "parentId": null
}
```

**Response (201 Created):**
```json
{
  "id": "comment-new",
  "postId": "post-1",
  "author": {...},
  "content": "Great post!",
  "parentId": null,
  "createdAt": "2024-01-02T10:30:00Z",
  "status": "pending"
}
```

## Error Responses

### Standard Error Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}  // Optional additional details
  }
}
```

### HTTP Status Codes

- **200 OK**: Successful request
- **201 Created**: Resource created successfully
- **204 No Content**: Successful request with no response body
- **400 Bad Request**: Invalid request format or parameters
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation error
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error
- **503 Service Unavailable**: Service temporarily unavailable

### Error Codes

- `AUTH_FAILED`: Authentication failed
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Request validation failed
- `DUPLICATE_ENTRY`: Resource already exists
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Internal server error

## Rate Limiting

API implements rate limiting to prevent abuse:

- **Anonymous users**: 100 requests per 15 minutes
- **Authenticated users**: 1000 requests per 15 minutes

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

## CORS Configuration

### Development

```javascript
{
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

### Production

```javascript
{
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

## Static Assets

### Asset URL Convention

Static assets (images, videos, files) should follow this URL pattern:

- **Images**: `/uploads/images/{year}/{month}/{filename}`
- **Videos**: `/uploads/videos/{year}/{month}/{filename}`
- **Files**: `/uploads/files/{year}/{month}/{filename}`

### Upload Endpoint (Authenticated)

```http
POST /api/uploads/images
```

**Headers:**
```http
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body:**
```
Form data with file field named 'file'
```

**Response (201 Created):**
```json
{
  "url": "https://cdn.example.com/uploads/images/2024/01/image-123.jpg",
  "filename": "image-123.jpg",
  "size": 102400,
  "mimeType": "image/jpeg"
}
```

## WebSocket Events (Optional)

For real-time features like live comments or notifications:

### Connection

```javascript
const ws = new WebSocket('ws://localhost:8090/ws');
```

### Events

#### New Comment

```json
{
  "type": "NEW_COMMENT",
  "data": {
    "postId": "post-1",
    "comment": {...}
  }
}
```

#### Like Update

```json
{
  "type": "LIKE_UPDATE",
  "data": {
    "postId": "post-1",
    "likes": 15
  }
}
```

## Frontend Build & Run

### Development

```bash
cd frontend
npm install
npm run dev
```

Frontend dev server runs on `http://localhost:3000`

### Build for Production

```bash
cd frontend
npm run build
```

Generates optimized files in `frontend/dist/`

### Preview Production Build

```bash
cd frontend
npm run preview
```

## Backend Implementation Notes

### Recommended Stack (Option 1: Spring Boot)

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
    </dependency>
</dependencies>
```

### Recommended Stack (Option 2: Node.js)

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0",
    "pg": "^8.11.0",
    "sequelize": "^6.32.0"
  }
}
```

## Security Considerations

1. **Always use HTTPS in production**
2. **Implement CSRF protection for authenticated endpoints**
3. **Sanitize user input to prevent XSS**
4. **Use prepared statements to prevent SQL injection**
5. **Implement rate limiting**
6. **Set secure JWT expiration times**
7. **Store passwords with bcrypt or similar**
8. **Validate file uploads (type, size)**
9. **Set proper CORS policies**
10. **Implement content security policy (CSP)**

## Deployment

### Frontend Deployment

Deploy `frontend/dist/` to:
- Static hosting: Vercel, Netlify, GitHub Pages
- CDN: AWS CloudFront, Cloudflare
- Nginx/Apache server

### Backend Deployment

Deploy backend to:
- Cloud platforms: AWS, Google Cloud, Azure
- Container platforms: Docker, Kubernetes
- Platform as a Service: Heroku, Railway

### Environment Variables

Frontend (`.env.production`):
```
VITE_API_BASE=https://api.yourdomain.com
```

Backend:
```
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
JWT_SECRET=your-secret-key
PORT=8090
NODE_ENV=production
```

## Testing Endpoints

Use tools like:
- **Postman**: API testing and documentation
- **cURL**: Command-line testing
- **Thunder Client**: VS Code extension

### Example cURL Request

```bash
# Get posts
curl -X GET "http://localhost:8090/api/posts?page=1&size=10"

# Create post (with auth)
curl -X POST "http://localhost:8090/api/posts" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Post",
    "content": "Post content",
    "status": "published"
  }'
```

## Changelog

- **v1.0.0** (2024-01-01): Initial API design
