# Fullstack Machines
Aplicação web criada com objetivos de aprendizagem relacionados a estruturação e arquitetura de software. Backend criado em Node Js uado como api para um frontend em React Js.
O sistema permite o gerenciamento de uma simulação de máquinas em um ambiente, onde são gerados eventos de status que devem ser tratados pela aplicação. Existe um CRUD para máquinas, status, e um simulador criado para gerar status aleatórios para cada máquina criada. O intervalo de geração dos status é controlado pelo usuário, dentro de opções pré definidas.

Foi utilizado no backend:
* Express para requisições e controle de fluxo.
* Socket.io para enviar atualizações dos status gerados para cada máquina.
* Node-cron para agendar a tarefa de geração dos status.
* Sequelize como ORM para models, migrations e comunicação com o banco de dados.
* Dotenv com arquivos de configuração de ambiente.

E no frontend:
* ReactJs para imterfaces e ferramenta para a SPA.
* Styled Components na estilização dos componentes da aplicação.
* Moment Js na formatação de datas e horas.

## Fluxo
Existem rotas para iniciar, parar ou alterar o tempo do cron (agendador de tarefas), onde também é emitido os eventos e dados por socket.
Assim, torna o processo de simulação aleatória de status independente de algum front ou ferramenta para enviar requisições individuais. Também funcionando para varios clientes simultaneamente, ja que todos escutam os eventos de início/fim da simulação.
Poderia ser criado uma autenticação, para separar cada alteração e armazenamento de alteração de status em canais diferentes.
