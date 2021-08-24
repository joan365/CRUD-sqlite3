# Iniciar aplicació
# Cal donar permisos chmod 770 a aquest script
# --------
# Configurar execució a la instancia /home/ec2-user/nodejs/CRUD-sqlite3/start.sh
# De moment no ha funcionat. Inicio manualment des de SSH

#!/bin/bash
cd /home/ec2-user/nodejs/CRUD-sqlite3
npm run pro >> logs/app.log &
echo "Aplicació CRUD iniciada"
