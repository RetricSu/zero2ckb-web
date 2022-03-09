FROM node:14-bullseye

COPY . /zero2ckb-web/.
RUN cd /zero2ckb-web && yarn && yarn build

RUN npm install pm2 -g

RUN echo "Finished installing dependencies"

EXPOSE 3000
