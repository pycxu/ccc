# FROM node:16.15.0-alpine as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json ./
# RUN npm install
# RUN npm uninstall bizcharts
# RUN yarn add bizcharts
# COPY . ./
# RUN npm run build

# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:16.15.0-alpine

ENV HTTP_PROXY http://wwwproxy.unimelb.edu.au:8000
ENV HTTPS_PROXY http://wwwproxy.unimelb.edu.au:8000
ENV NO_PROXY localhost,127.0.0.1,localaddress,172.16.0.0/12,.melbourne.rc.necta>

# set working directory
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json ./

RUN npm install
RUN npm uninstall bizcharts
RUN yarn add bizcharts
COPY . ./

EXPOSE 3000
# start app
CMD ["npm", "start"]

