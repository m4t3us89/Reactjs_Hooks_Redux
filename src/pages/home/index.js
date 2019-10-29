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
  return (
    <>
      <DatatableComponent
        columns={columns}
        title={'Lista Todo'}
        urlApi={{ list: '/todo', delete: '/todo/profile' }}
        itemPerPage={10}
        theme={'darkTheme'}
        msgProgress={'Carregando TODO'}
      />
    </>
  )
}
