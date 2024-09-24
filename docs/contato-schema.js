/* eslint-disable no-console */
fetch('/api/dataentities/FC/schemas/FormularioDeContato', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/ json', Accept: 'application/json' },
  body: JSON.stringify({
    title: 'FormularioDeContato',
    type: 'object',
    properties: {
      subject: {
        type: 'string',
        title: 'Assunto',
      },
      name: {
        type: 'string',
        title: 'Nome',
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email',
      },
      message: {
        type: 'string',
        title: 'Mensagem',
      },
    },
    required: ['email', 'message'],
    'v-security': {
      publicJsonSchema: true,
    },
  }),
})
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.log(err))

// Script para consulta da Entity. Deve ter o valor enviado acima
/* fetch('/api/dataentities/FC/schemas', {
  method: 'GET',
  headers: { 'Content-Type': 'application/ json', Accept: 'application/json' },
})
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.log(err)) */
