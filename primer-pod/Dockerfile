# Define la imagen base
FROM node:14

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de la aplicación
COPY package*.json ./
COPY index.js ./
COPY jumpSearch.js ./
COPY linearSearch.js ./

# Instalar dependencias
RUN npm install

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
