FROM node:20.13.1 as builder
RUN mkdir -p /app
WORKDIR /app
COPY . ./
RUN npm i

FROM node:20.13.1-alpine as main
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000

CMD ["npm", "run", "start"]