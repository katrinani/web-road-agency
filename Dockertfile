FROM node:alpine AS development

WORKDIR /web-road-agency

COPY ./package*.json /web-road-agency

RUN npm install

COPY . .

CMD ["npm","start"]