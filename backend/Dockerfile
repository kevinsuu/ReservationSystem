# 使用 Node.js 官方的基本映像
FROM node:14

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json（如果存在）到工作目錄
COPY package*.json ./

# 安裝應用程式的依賴
RUN npm install

# 複製應用程式代碼到工作目錄
COPY . .

# 暴露應用程式所使用的端口（如果需要）
EXPOSE 3000

# 定義容器啟動時運行的命令
CMD ["node", "app.js"]
