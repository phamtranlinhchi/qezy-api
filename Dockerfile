# BUILDER STAGE
FROM node:18 AS builder
WORKDIR /home/node/app
COPY . .
RUN npm install
RUN npm run build

FROM node:current-slim

WORKDIR /home/node/app

COPY --from=builder /home/node/app/package.json     /home/node/app/
COPY --from=builder /home/node/app/dist/            /home/node/app/dist/
COPY --from=builder /home/node/app/node_modules/    /home/node/app/node_modules/

EXPOSE 3000

ENTRYPOINT npm run start