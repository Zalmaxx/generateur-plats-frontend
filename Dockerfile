# Étape 1: Build de l'application Angular
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install --silent

# Copier le reste des fichiers de l'application
COPY . .

# Builder l'application Angular en utilisant l'environnement de production
RUN npm run build -- --configuration=production

# Étape 2: Configuration du serveur Nginx
FROM nginx:alpine

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers construits d'Angular vers Nginx
COPY --from=build /app/dist/generateur-plats-frontend /usr/share/nginx/html

# Copier le script de création du fichier config.js
COPY create-env-config.sh /docker-entrypoint.d/

# Rendre le script exécutable
RUN chmod +x /docker-entrypoint.d/create-env-config.sh

# Exposer le port 80 pour Nginx
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
