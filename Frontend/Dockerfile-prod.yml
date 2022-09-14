FROM node:lts-alpine as react-build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=react-build /app/dist /usr/share/nginx/html
