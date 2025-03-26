@ECHO OFF
:start
SET choice=
SET /p choice=Do you want to clear and build new migrations + update database Y/N: 
IF NOT '%choice%'=='' SET choice=%choice:~0,1%
IF '%choice%'=='Y' GOTO yes
IF '%choice%'=='y' GOTO yes
IF '%choice%'=='N' GOTO no
IF '%choice%'=='n' GOTO no
IF '%choice%'=='' GOTO no
ECHO "%choice%" is not valid
ECHO.
GOTO start

:no
PAUSE
EXIT

:yes
ECHO: -----------------------------------
ECHO: **** Removing existing migrations ****
if exist "Migrations" (
    rmdir /s /q "Migrations"
    echo Folder removed: Migrations
) else (
    echo Folder does not exist: Migrations
)

ECHO **** Removing database file *****
del /s /q "*.db"
ECHO: -----------------------------------

ECHO: **** Creating new migrations ****
dotnet ef migrations add InitialCreate
ECHO: -----------------------------------

ECHO: **** Updating database ****
dotnet ef database update

PAUSE
EXIT