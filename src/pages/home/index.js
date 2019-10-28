import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Axios from '../../services/api'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component'
import './styles.css'

const rowTheme = {
  rows: {
    // spaced allows the following properties
    spacing: 'spaced',
    spacingBorderRadius: '50px',
    spacingMargin: '3px',

    borderColor: 'rgba(0,0,0,.12)',
    backgroundColor: 'white',
    height: '52px'
  },
  cells: {
    cellPadding: '48px'
  }
}

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
        src={'http://localhost:3333/file/' + row.file_name}
        className='imgTable'
      />
    )
  }
]

export default function Home () {
  // const [todo, setTodo] = useState([])
  // const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  useEffect(() => {
    fetchUsers(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUsers = async page => {
    setLoading(true)

    const response = await Axios.get(`/todo?page=${page}&per_page=${perPage}`)

    setData(response.data.data)
    setTotalRows(response.data.total)
    setLoading(false)
  }

  const handlePageChange = page => {
    fetchUsers(page)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)

    const response = await Axios.get(
      `/todo?page=${page}&per_page=${newPerPage}&delay=1`
    )

    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  async function handleSort (column, sortDirection) {
    setLoading(true)
    setPerPage(10)

    const response = await Axios.get(
      `/todo?page=1&per_page=${perPage}&selector=${
        column.selector
      }&direction=${sortDirection}`
    )

    setData(response.data.data)
    setLoading(false)
  }

  /* Selecionar para deletar */
  const [selectedRows, setSelectedRows] = useState([])
  const [toggleCleared, setToggleCleared] = useState(false)

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows)
  }, [])

  const contextActions = useMemo(
    () => {
      const handleDelete = () => {
        if (
          window.confirm(
            `Are you sure you want to delete:\r ${selectedRows.map(
              r => r.descricao
            )}?`
          )
        ) {
          setToggleCleared(!toggleCleared)
          // setData(differenceBy(data, selectedRows, 'name'));
          deleteTodo()
        }
      }

      return (
        <Button
          variant='danger'
          key='delete'
          onClick={handleDelete}
          // style={{ backgroundColor: 'red' }}
          // icon
        >
          Delete
        </Button>
      )
    },
    [data, selectedRows, toggleCleared]
  )

  async function deleteTodo () {
    console.log(selectedRows)
    const todo = await Axios.delete('/todo/profile', {
      data: { selectedRows }
    })
    fetchUsers(1)
    console.log(todo)
  }

  return (
    <>
      <DataTable
        title='Todo List'
        customTheme={rowTheme}
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onSort={handleSort}
        selectableRows
        contextActions={contextActions}
        onRowSelected={handleRowSelected}
        clearSelectedRows={toggleCleared}
      />
    </>
  )
}
