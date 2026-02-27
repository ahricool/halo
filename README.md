# Ahri.Cool CMS
powered by Halo

## 🎨 Sakura Theme - Frontend & Backend Split

This repository now contains a modernized version of the Sakura theme with a clear separation between frontend and backend.

### 📁 Project Structure

```
.
├── frontend/           # Vue 3 + TypeScript + Vite frontend application
├── backend/            # Backend API (placeholder - to be implemented)
├── docs/              # Documentation including API design
├── data/              # Original Halo data including theme-sakura
└── ...                # Other Halo CMS files
```

## 🚀 Frontend (Vue 3 + Vite + TypeScript)

The frontend is a modern single-page application built with:

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and optimized builds
- **Vue Router** for client-side routing
- **Pinia** for state management
- **Axios** for API communication

### Quick Start

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Frontend Features

- ✅ Responsive design
- ✅ Dark mode support
- ✅ Modern component architecture
- ✅ Mock data for development
- ✅ Ready for API integration
- ✅ SEO-friendly routing
- ✅ Optimized performance

### Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
VITE_API_BASE=/api  # Backend API URL
```

## 🔧 Backend (To Be Implemented)

The backend is currently a placeholder. It should implement a RESTful API to serve content to the frontend.

**Recommended technology stacks:**
1. Spring Boot (Java) - Best for Halo integration
2. Node.js + Express (JavaScript/TypeScript)
3. FastAPI (Python)

### Backend Setup (When Implemented)

```bash
cd backend
# Follow setup instructions in backend/README.md
```

For detailed API specifications, see **[API Design Document](docs/design.md)**.

## 📚 Documentation

- **[API Design](docs/design.md)** - Complete REST API specification
- **[Backend README](backend/README.md)** - Backend implementation guide
- **[Frontend README](frontend/README.md)** - Frontend development guide

## 🏗️ Original Halo Build

Build Jar:
```shell
# Windows
./gradlew.bat clean build -x check 
```

Build Docker Images:
```shell
docker build -t ahri .
docker tag ahri:latest public.ecr.aws/o7d5s8i7/ahri:latest
```

Push Docker Images to AWS ECR:
```shell
docker push public.ecr.aws/o7d5s8i7/ahri:latest
```

## 🐳 Deployment

### Development Environment

```shell
# Windows Dev Env
docker compose -f ./docker-compose.dev.yaml up

# With new frontend
cd frontend && npm run dev
```

### Production Environment

```shell
# Halo CMS
docker compose up -d

# Frontend (build and serve static files)
cd frontend
npm run build
# Serve dist/ directory with nginx or other web server
```

## 🎯 Migration from theme-sakura

The original `data/themes/theme-sakura` theme has been:

1. **Frontend Assets** → Migrated to `frontend/public/` and `frontend/src/assets/`
2. **Templates** → Converted to Vue components in `frontend/src/components/` and `frontend/src/pages/`
3. **Original Templates** → Backed up in `frontend/templates/original/` for reference
4. **Theme Logic** → Implemented with Vue 3 Composition API and Pinia stores

## 🔗 API Integration

The frontend is configured to communicate with the backend via:

- **Base URL**: Configurable via `VITE_API_BASE` environment variable
- **Default**: `/api` (proxied to backend in development)
- **Authentication**: JWT token-based (stored in localStorage)
- **Error Handling**: Global error interceptors

### Example API Usage

```typescript
import { api } from '@/services/api';

// Fetch posts
const posts = await api.getPosts({ page: 1, size: 10 });

// Get single post
const post = await api.getPost('post-id');

// Search
const results = await api.searchPosts('vue');
```

## 🧪 Development Workflow

1. **Frontend Development** (with mock data):
   ```bash
   cd frontend
   npm run dev
   ```

2. **Backend Development** (when implemented):
   ```bash
   cd backend
   # Run backend server on port 8090
   ```

3. **Full Stack Development**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8090`
   - Vite proxy handles `/api` requests to backend

## 🛠️ Technology Stack

### Frontend
- Vue 3.5+
- TypeScript 5.9+
- Vite 7.2+
- Vue Router 5.0+
- Pinia 3.0+
- Axios 1.13+

### Backend (Recommended)
- Spring Boot 3.x (Java)
- PostgreSQL/MySQL
- JWT Authentication
- RESTful API

### Original Halo CMS
- Java + Spring Boot
- Gradle build system
- Docker containerization

## 📝 TODO

- [ ] Implement backend API
- [ ] Add user authentication UI
- [ ] Implement comment system
- [ ] Add search functionality
- [ ] Set up CI/CD pipeline
- [ ] Add E2E tests
- [ ] Improve SEO optimization
- [ ] Add internationalization (i18n)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Write tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Sakura theme by [LIlGG](https://github.com/LIlGG)
- [Halo CMS](https://github.com/halo-dev/halo)
- Vue.js and Vite communities

---

For detailed technical documentation, please refer to:
- [API Design Document](docs/design.md)
- [Backend Implementation Guide](backend/README.md)