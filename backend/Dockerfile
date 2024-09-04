# # 使用 Node.js 官方的基本映像
# FROM node:14

# # 設置工作目錄
# WORKDIR /usr/src/app

# # 複製 package.json 和 package-lock.json（如果存在）到工作目錄
# COPY package*.json ./

# RUN npm cache clean --force

# # 在容器內安裝應用程式的依賴
# RUN npm install
# RUN npm install -g nodemon

# # 複製應用程式代碼到工作目錄
# COPY . .

# # 暴露應用程式所使用的端口
# EXPOSE 3002

# # 定義容器啟動時運行的命令
# CMD ["nodemon", "server.js"]

FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

# 安裝 PM2
RUN npm install -g pm2

COPY . .

# 使用 PM2 啟動應用
CMD ["pm2-runtime", "start", "server.js", "--watch"]