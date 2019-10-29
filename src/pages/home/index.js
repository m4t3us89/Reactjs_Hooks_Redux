import React from 'react'
import DatatableComponent from '../../components/datatable'

const columns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
    cell: row => <b>#{row.id}</b>
  },
  {
    name: 'Descrição',
    selector: 'descricao',
    sortable: true
  },
  {
    name: 'CreatedAt',
    selector: 'created_at',
    sortable: true
  },
  {
    name: 'File',
    selector: 'file_name',
    // sortable: false,
    cell: row => (
      <img
        alt={'Imagem'}
        src={'http://localhost:3333/file/' + row.file_name}
        className='imgTable'
      />
    )
  }
]

export default function Home () {
  function actionEdit () {
    const selectedRows = JSON.parse(localStorage.getItem('selectedRows'))
    const countRows = selectedRows.length
    if (countRows === 0) alert('Selecione um item para editar')
    else if (countRows > 1) alert('Selecione Apenas um item para editar')
    else {
      alert(`Ok, Editar. ${selectedRows[0].descricao}`)
    }
  }
  function actionAdd () {
    alert('Adicionar')
  }
  return (
    <>
      <DatatableComponent
        columns={columns}
        title='Todo'
        urlApi={{ list: '/todo', delete: '/todo/profile' }}
        itemPerPage='10'
        theme='darkTheme'
        msgProgress='Carregando TODO'
        actions={[]}
        actionEdit={actionEdit}
        actionAdd={actionAdd}
      />
    </>
  )
}
