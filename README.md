# CI/CD Pipeline for Dockerized MERN Application

This repository contains a **CI/CD pipeline** to automate the build and deployment of a Dockerized **MERN stack application** (Backend and Frontend) using **GitHub Actions** and **Docker Hub**.

## **Project Structure**
```
/Deployment
│── BACKEND/
│   ├── Dockerfile
│   ├── server.js
│   ├── package.json
│── FRONTEND/
│   ├── Dockerfile
│   ├── src/
│   ├── package.json
│── .github/workflows/
│   ├── ci-cd-pipeline.yml  # GitHub Actions workflow
```

## **Steps Followed**

### **1. Set Up Dockerfiles**

**Backend (`BACKEND/Dockerfile`)**:
```dockerfile
# Use Node.js as the base image
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
```

**Frontend (`FRONTEND/Dockerfile`)**:
```dockerfile
# Use Node.js as the base image
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

### **2. Create GitHub Actions Workflow (`.github/workflows/ci-cd-pipeline.yml`)**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Backend Docker image
        run: |
          docker buildx build --platform linux/amd64 -t ${{ secrets.DOCKER_USERNAME }}/backend:latest -f BACKEND/Dockerfile BACKEND --load
          docker push ${{ secrets.DOCKER_USERNAME }}/backend:latest

      - name: Build and push Frontend Docker image
        run: |
          docker buildx build --platform linux/amd64 -t ${{ secrets.DOCKER_USERNAME }}/frontend:latest -f FRONTEND/Dockerfile FRONTEND --load
          docker push ${{ secrets.DOCKER_USERNAME }}/frontend:latest
```

### **3. Set Up GitHub Secrets**
To authenticate Docker Hub in GitHub Actions, set up the following secrets:
- **DOCKER_USERNAME** → Your Docker Hub username.
- **DOCKER_PASSWORD** → Your Docker Hub access token.

**Steps to Add Secrets:**
1. Go to **GitHub Repository → Settings → Secrets and Variables → Actions**
2. Click **"New Repository Secret"**
3. Add **DOCKER_USERNAME** and **DOCKER_PASSWORD**

### **4. Commit and Push Changes**
```sh
git add .
git commit -m "Added CI/CD pipeline for Dockerized MERN app"
git push origin main
```

### **5. Check GitHub Actions Workflow**
- Go to your **GitHub repository → Actions** tab.
- Check if the workflow runs successfully.

### **6. Deployment**
Once the images are built and pushed to Docker Hub, you can pull and run them on any server:
```sh
docker pull <DOCKER_USERNAME>/backend:latest
docker run -d -p 5000:5000 <DOCKER_USERNAME>/backend:latest

docker pull <DOCKER_USERNAME>/frontend:latest
docker run -d -p 80:80 <DOCKER_USERNAME>/frontend:latest
```

## **Conclusion**
This CI/CD pipeline automates the process of building and deploying a **MERN application** with Docker and GitHub Actions. Every push to the `main` branch will automatically build and push the latest images to Docker Hub. 🚀
