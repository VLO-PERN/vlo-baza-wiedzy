FROM node:lts

COPY . .

RUN yarn

RUN yarn build

RUN yarn global add serve

CMD serve -l 80 -s build