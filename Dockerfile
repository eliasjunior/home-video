FROM node:15 as build

ENV NODE_ENV=production
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY ["package.json", "package-lock.json", ".eslintrc.js", "jsconfig.json", "./"]

RUN npm install --production --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . . 

RUN npm run build

# production environment
# FROM node:15.6.0-alpine
# COPY --from=build /app ./

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# ENTRYPOINT [ "npm", "start"]
CMD ["nginx", "-g", "daemon off;"]