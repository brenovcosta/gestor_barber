# Gestor Barber

Gestor Barber é um sistema desenvolvido para facilitar o gerenciamento de barbearias. 
O sistema foi desenvolvido por Breno Vinicius Costa, aluno do Instituto Federal de Educação, Ciência e Tecnologia de Minas Gerais – <i>Campus</i> Formiga, como Trabalho de Conclusão do Curso Técnico Integrado ao Ensino Médio em Informática.

# Requisitos
* Java 8
* Node v14.18.0 
* Angular v12.2.8

# Iniciando a aplicação

### Banco de dados
Primeiramente devemos criar o container do docker que contem nosso banco de dados. 
Para isso vá até a pasta docker em gestor_barber/backend/docker e rode o seguinte comando:
`docker-compose up -d`

### Backend
Agora, devemos subir nosso serviço do backend. Para isso, vá até a pasta backend e rode o comando a seguir: <br>
`mvn clean install`<br>
Na mesma pasta, rode o comando:<br>
`mvn spring-boot:run`<br>
Agora nossa API estará de funcionando!

### Frontend
Agora iremos executar nossa aplicação do frontend. Para isso, vá até a pasta frontend e execute:<br>
`npm install`<br>
Logo após, execute:<br>
`npm start`

Agora nossa aplicação estará funcionando e podera ser acessada através da url: [http://localhost:4200/](http://localhost:4200/)
