@echo off
title Executando Psico Plataforma Localmente
echo ===================================================
echo Iniciando o Servidor de Desenvolvimento Local...
echo ===================================================

:: Verificar se a pasta node_modules existe
if not exist "node_modules\" (
    echo [INFO] Pasta node_modules nao encontrada. Instalando dependencias...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao instalar as dependencias. Verifique se o Node.js esta instalado.
        pause
        exit /b %errorlevel%
    )
)

:: Abrir o navegador automaticamente em 3 segundos
start "" "http://localhost:3000"

:: Iniciar o servidor next.js
echo [INFO] Iniciando o servidor Next.js na porta 3000...
call npm run dev
pause
