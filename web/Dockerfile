# Frontend Dockerfile (app/front/Dockerfile)
# Build stage
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /usr/src/app

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
