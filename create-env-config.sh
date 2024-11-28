#!/bin/sh

# Assurez-vous que la variable d'environnement API_URL est définie
if [ -z "$API_URL" ]; then
  echo "API_URL n'est pas définie. Utilisation de la valeur par défaut : http://localhost:8080"
  API_URL="http://attribution-failed:8080"
fi

# Créer le fichier config.js avec la valeur de API_URL
cat <<EOF > /usr/share/nginx/html/assets/config.js
window.env = {
  API_URL: "$API_URL"
};
EOF
