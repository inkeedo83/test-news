# Build Stage
FROM node:20-bullseye-slim AS build
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the source code and build the application
COPY . .
# This needs to build the app, ensuring dist/main is created
RUN yarn build  

# Production Stage
FROM node:20-bullseye-slim
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy the built files from the build stage
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist  
# Ensure this copies the dist directory

# Use a non-root user to run the app
USER node

# Expose the port the app will run on
EXPOSE 5000

# Start the application
CMD ["yarn", "start:prod"]