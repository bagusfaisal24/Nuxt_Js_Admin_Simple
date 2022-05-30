FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
COPY . /usr/src/app

RUN yarn install 
RUN yarn build 
RUN yarn generate

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "run", "start" ] --host 0.0.0.0
