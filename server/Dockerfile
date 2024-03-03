FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN npm install -g nodemon

COPY . .

# RUN npm run build 

EXPOSE 3001

CMD ["npm", "start"]  # Adjusted path to src/App.ts
