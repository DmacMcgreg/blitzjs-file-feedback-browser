FROM node:10-slim
WORKDIR /backend

ENV NODE_ENV production

COPY ./backend/package.json /backend/
RUN  yarn
COPY ./backend/ /backend

COPY app/dist /backend/app

CMD ["npm", "start"]

EXPOSE 8080