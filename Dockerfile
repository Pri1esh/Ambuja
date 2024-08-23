FROM node
RUN mkdir  -p /app
WORKDIR /app

COPY ["package.json", "./"]
COPY .next  ./.next
COPY public  ./public
COPY node_modules ./node_modules
COPY next.config.js ./
COPY .env.prod ./
CMD ["yarn","start"]
