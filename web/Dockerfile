# Frontend Dockerfile (app/front/Dockerfile)
# Build stage
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Define build arguments
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE
ARG VITE_BASE_URL

# Set environment variables from build arguments
ENV VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN}
ENV VITE_AUTH0_CLIENT_ID=${VITE_AUTH0_CLIENT_ID}
ENV VITE_AUTH0_AUDIENCE=${VITE_AUTH0_AUDIENCE}
ENV VITE_BASE_URL=${VITE_BASE_URL}

# Copy the package.json and yarn.lock to install dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code and build
COPY . .
RUN npm run build

# NGINX stage
FROM nginx:alpine

# Copy build output to NGINX's web root
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf


# Expose port 80 for serving HTTP traffic
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
