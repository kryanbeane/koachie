FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# RUN npm run build                  # For production
# RUN npm prune --production         # For production

FROM node:22-alpine
WORKDIR /app
# COPY --from=builder /app/build build/                 # For production
# COPY --from=builder /app/node_modules node_modules/   # For production
# COPY package.json .                                   # For production
EXPOSE 3000
# ENV NODE_ENV=production                               # For production
ENV NODE_ENV=development
# CMD [ "node", "build" ]
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]



