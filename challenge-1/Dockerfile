FROM node:21-alpine

ENV HOST_PORT=6000

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY --chmod=777 package*.json ./

USER node
RUN npm install
COPY --chown=node:node . .

EXPOSE $HOST_PORT
CMD ["node", "."]
