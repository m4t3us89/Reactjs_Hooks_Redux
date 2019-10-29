import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Axios from '../../services/api'
import { Button } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'
import DataTable from 'react-data-table-component'

import './styles.css'

/* Progress Indicator */
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  margin: 50px 50px 10px 50px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

/* Themas rowTheme or darkTheme */
const themes = {
  rowTheme: {
    rows: {
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
  },
  darkTheme: {
    title: {
      fontSize: '22px',
      fontColor: '#FFFFFF',
      backgroundColor: '#363640'
    },
    contextMenu: {
      backgroundColor: '#E91E63',
      fontColor: '#FFFFFF'
    },
    header: {
      fontSize: '12px',
      fontColorActive: 'FFFFFF',
      fontColor: '#FFFFFF',
      backgroundColor: '#363640'
    },
    rows: {
      fontColor: '#FFFFFF',
      backgroundColor: '#363640',
      borderColor: 'rgba(255, 255, 255, .12)',
      hoverFontColor: 'black',
      hoverBackgroundColor: 'rgba(0, 0, 0, .24)'
    },
    cells: {
      cellPadding: '48px'
    },
    pagination: {
      fontSize: '13px',
      fontColor: '#FFFFFF',
      backgroundColor: '#363640',
      buttonFontColor: '#FFFFFF',
      buttonHoverBackground: 'rgba(255, 255, 255, .12)'
    },
    expander: {
      fontColor: '#FFFFFF',
      backgroundColor: '#363640',
      expanderColor: '#FFFFFF'
    }
  }
}

export default function DatatableComponent ({
  columns,
  title,
  urlApi,
  itemPerPage,
  theme,
  msgProgress
}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(itemPerPage)

  useEffect(() => {
    fetchUsers(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUsers = async page => {
    setLoading(true)

    const response = await Axios.get(
      `${urlApi.list}?page=${page}&per_page=${perPage}`
    )

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
      `${urlApi.list}?page=${page}&per_page=${newPerPage}&delay=1`
    )

    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  async function handleSort (column, sortDirection) {
    setLoading(true)
    // setPerPage(10)
    const response = await Axios.get(
      `${urlApi.list}?page=1&per_page=${perPage}&selector=${
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
          /* window.confirm(
            `Are you sure you want to delete:\r ${selectedRows.map(
              r => r.descricao
            )}?`
          ) */
          window.confirm(
            `Are you sure you want to delete:\r ${
              selectedRows.length
            } item(s) selected ?`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, selectedRows, toggleCleared]
  )

  async function deleteTodo () {
    console.info('Linhas Selecionadas: ', selectedRows)
    const todo = await Axios.delete(urlApi.delete, {
      data: { selectedRows }
    })
    fetchUsers(1)
    console.info('Retorno API: ', todo)
  }

  // Custom Progress Loader
  const CustomLoader = () => (
    <div>
      <Spinner />
      <div>{msgProgress}</div>
    </div>
  )

  return (
    <>
      <DataTable
        title={title}
        customTheme={themes[theme]}
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<CustomLoader />}
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
