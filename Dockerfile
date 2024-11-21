FROM node:22 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install 

COPY . . 

RUN npx prisma generate 

RUN npm run build 

COPY entryscript.sh /app/entryscript.sh

RUN chmod +x /app/entryscript.sh

EXPOSE 3000

CMD ["./entryscript.sh"] 



