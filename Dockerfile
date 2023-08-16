# Utilisez une image de base Node.js
FROM node:20

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application React
RUN npm run build

# Commande par défaut pour démarrer le serveur
CMD ["npm", "start"]