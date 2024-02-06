
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y dependencias del proyecto
COPY package*.json tsconfig*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Compila la aplicación (puedes ajustar el comando según tu configuración)
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación cuando el contenedor se inicia
CMD ["npm", "run", "start:prod"]