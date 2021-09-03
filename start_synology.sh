# Iniciar aplicació
# Cal donar permisos chmod 770 a aquest script
# --------
# 
# 

#!/bin/bash
cd /volume1/nodejs/CRUD-sqlite3
npm run syno >> logs/app.log &
echo "Aplicació CRUD iniciada"
