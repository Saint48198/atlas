@@ -1,36 +0,0 @@
# Create image based on the official Node 10 image from dockerhub
FROM nginx:alpine
RUN apk update && apk upgrade
RUN apk add nodejs npm

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/share/nginx/html

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# Run the angular in product
RUN npm run build

## Remove default nginx website
RUN rm /etc/nginx/conf.d/default.conf

# Copy dependency definitions
RUN cp /usr/src/app/dist/angular-client/* /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
