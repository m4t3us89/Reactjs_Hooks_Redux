import React, { useState } from 'react'
import DatatableComponent from '../../components/datatable'
import ModalComponent from '../../components/modal'
import FormComponenet from '../../components/form'
import Axios from '../../services/api'
import { base64StringToBlob } from 'blob-util'
import * as Yup from 'yup'

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

  const [showModal, setShowModal] = useState(false)

  async function handleSubmit (data, { resetForm }) {
    console.log(data)
    const formData = new FormData()
    formData.append('descricao', data.descricao)

    const file = data.file.split(';')
    const contentType = file[0].split(':')[1]
    const file_ = file[1].split(',')[1]

    formData.append('file', base64StringToBlob(file_, contentType))
    const retorno = await Axios.post('/todo/profile', formData)
    resetForm()
    console.log(retorno)
  }

  function handleProgress (progress, event) {
    console.log(progress)
  }

  function bodyModalAddTodo () {
    const fields = [
      {
        name: 'descricao',
        type: 'text',
        validator: {
          descricao: Yup.string()
            .min(4)
            .required('Custom required message')
        }
      },
      {
        name: 'file',
        type: 'file',
        validator: {
          file: Yup.mixed().required('Arquivo Obrigatório')
        }
      }
    ]

    return (
      <FormComponenet
        handleSubmit={handleSubmit}
        handleProgress={handleProgress}
        fields={fields}
      />
    )
  }

  return (
    <>
      <DatatableComponent
        columns={columns}
        title='Todo'
        urlApi={{ list: '/todo', delete: '/todo/profile' }}
        itemPerPage='10'
        // theme='darkTheme'
        msgProgress='Carregando TODO'
        actions={[]}
        actionEdit={actionEdit}
        actionAdd={() => setShowModal(true)}
      />
      <ModalComponent
        handleClose={() => {
          setShowModal(false)
          window.location.reload()
        }}
        show={showModal}
        body={bodyModalAddTodo()}
        title={'Cadastro Todo'}
      />
    </>
  )
}
