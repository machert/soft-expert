## Comandos

mkdir soft_expert
chmod -R 777 .

linux 20.04
sudo add-apt-repository ppa:ondrej/php

sudo apt-get update
sudo apt-get install php8.2

## postgresql

sudo apt install postgresql-client
sudo apt-get install php-pgsql
 
Editei o php.ini do 8.2 que eu estava usando e inclui no php o driver do postgree em dynamic extension:
extension=pgsql.so

sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql

para conectar no postgree
sudo -i -u postgres 

sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'


wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo tee /etc/apt/trusted.gpg.d/postgree.asc

## mssql

sudo apt update
sudo apt upgrade

# na raiz
cd /etc
sudo touch wsl.conf
sudo nano wsl.conf
    [boot]
    systemd=true


wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -

sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-preview.list)"


sudo apt-get update
sudo apt-get install -y mssql-server


## 

mkdir soft_expert
chmod -R 777 .

sudo add-apt-repository ppa:ondrej/php

sudo apt-get update
sudo apt-get install php8.2

sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'


wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -


sudo apt-get update

sudo apt-get -y install postgresql

sudo apt-get install postgresql-12

# para executar o postgree
sudo service postgresql start

sudo -u postgres psql

create database soft_expert;

<!--
## pgdmin

#
# Setup the repository
#

# Install the public key for the repository (if not done previously):
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg

# Create the repository configuration file:
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'


#
# Install pgAdmin 4
#
 
# Install for both desktop and web modes:
sudo apt install pgadmin4

# Install for desktop mode only:
sudo apt install pgadmin4-desktop

# Install for web mode only: 
sudo apt install pgadmin4-web 

# Configure the webserver, if you installed pgadmin4-web:
sudo /usr/pgadmin4/bin/setup-web.sh -->

<!-- ## pgadmin 3
sudo apt-get update
sudo apt-get install pgadmin3
```

5. Aguarde o processo de instalação ser concluído.

6. Após a instalação, execute novamente o comando `pgadmin3` para verificar se o programa foi instalado corretamente.

Caso você queira instalar a última versão do PGAdmin 4, você pode baixar o instalador no site oficial do PostgreSQL (https://www.postgresql.org/ftp/pgadmin/pgadmin4/v5.2/pip/) e seguir as instruções para fazer a instalação.
 -->

sudo apt install curl

curl https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo apt-key add

sudo sh -c 'echo "deb https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'

sudo apt install pgadmin4

sudo /usr/pgadmin4/bin/setup-web.sh


sudo apt install php-pgsql
sudo su - postgres
psql

ALTER USER postgres PASSWORD 'soft123';

sudo systemctl restart apache2



editei o apache2.conf e inclui para aceitar redirect 
<Directory /soft_expert>
    AllowOverride All
    Require all granted
</Directory>



sudo systemctl restart apache2


sudo a2enmod rewrite



sudo su - postgres
psql -U postgres -d soft_expert


verificar o .env pra não ser exibido



## vue js

sudo apt install nodejs

sudo apt install npm


sudo apt-get update 
sudo apt-get upgrade

npm create vue@latest




## sql
CREATE TABLE tax_product_type (
    id serial PRIMARY KEY,
    tax_id integer REFERENCES tax(id),
    product_type_id integer REFERENCES product_type(id),
    value numeric NOT NULL
);


CREATE TABLE product (
    id serial PRIMARY KEY,
    product_type_id integer REFERENCES product_type(id),
    name varchar(100) NOT NULL,
    value numeric NOT NULL
);
 

CREATE TABLE sale (
    id serial PRIMARY KEY,
    name_customer varchar(50) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE sale_product (
    id serial PRIMARY KEY,
    sale_id integer REFERENCES sale(id) NOT NULL,
    product_id integer REFERENCES product(id) NOT NULL,
    quantity numeric NOT NULL
);