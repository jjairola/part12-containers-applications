


VITE_BACKEND_URL=http://localhost:3000 docker build -t todo-frontend .
docker run -P 


VITE_BACKEND_URL=http://localhost:3000 npm run dev

docker build -f Dockerfile.dev -t todo-frontend-dev .

docker-compose -f docker-compose.dev.yml up --build