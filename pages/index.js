import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transferencias = () => {
  const [transferencias, setTransferencias] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nome, setnome] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(nome == '') setnome(null);
      const response = await axios.get('http://localhost:8080/transferencias', {
        params: {
          startDate,
          endDate,
          nome
        }
      });
      setTransferencias(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <> 
    <Container>      
      <div className='mt-2'> 
      <h1>Transferências</h1>
      <Form onSubmit={handleSubmit} className='mb-4'> 
        <Form.Group controlId="startDate">
          <Form.Label>Data Inicial:</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>Data Final:</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="nome">
          <Form.Label>Nome do Operador:</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setnome(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-2'>
          Pesquisar
        </Button>
      </Form>

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Nome do Operador</th>
          </tr>
        </thead>
        <tbody>
          {transferencias.map((transferencia) => (
            <tr key={transferencia.id}>
              <td>{transferencia.id}</td>
              <td>{transferencia.dataTransferencia.substring(0,10)}</td>
              <td>{transferencia.valor}</td>
              <td>{transferencia.tipo}</td>
              <td>{transferencia.nome_operador_transacao}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
    </Container>
    </>
  );
};

export default Transferencias;
