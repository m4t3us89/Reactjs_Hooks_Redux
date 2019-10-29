import React from 'react'
import { Form, FileInput, Input, Select, Choice } from '@rocketseat/unform'
import * as Yup from 'yup'

// import { Container } from './styles';

export default function FormComponent ({
  handleSubmit,
  handleProgress,
  fields
}) {
  var obj = {}
  fields.forEach(value => {
    obj = { ...obj, ...value.validator }
  })

  const schema = Yup.object().shape(obj)

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      {fields.map((value, index) => {
        if (value.type === 'file') {
          return (
            <FileInput
              key={index}
              name={value.name}
              onStartProgress={handleProgress}
            />
          )
        } else if (value.type === 'select') {
          return (
            <Select name={value.name} options={value.options} key={index} />
          )
        } else if (value.type === 'choice') {
          return (
            <Choice
              key={index}
              name={value.name}
              options={value.options}
              multiple
            />
          )
        } else {
          return <Input name={value.name} key={index} />
        }
      })}
      <br />
      <br />
      <button type='submit'>Enviar</button>
    </Form>
  )
}
