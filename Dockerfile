# BUILDER STAGE
FROM node:18 AS builder
WORKDIR /home/node/app
COPY . .
RUN npm install
#RUN npx playwright install
RUN npm run build

FROM node:current-slim

WORKDIR /home/node/app

COPY --from=builder /home/node/app/package.json     /home/node/app/
COPY --from=builder /home/node/app/dist/            /home/node/app/dist/
COPY --from=builder /home/node/app/node_modules/    /home/node/app/node_modules/
COPY --from=builder /home/node/app/chromium-1105    /home/node/app/node_modules/playwright-core/.local-browsers/chromium-1105
RUN apt-get update && \
     apt-get install -y libgles2 libglib2.0-dev libnss3 libnspr4 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libglib2.0-0 libdrm2 libatspi2.0-0 libexpat1 libx11-6 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 libgbm1 libxcb1 libxkbcommon0 libpango-1.0-0 libcairo2 libasound2
EXPOSE 3000

ENTRYPOINT npm run start