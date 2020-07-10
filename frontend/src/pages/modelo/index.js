import React, { Component } from 'react';
import api from '../../services/api';

import { Link } from 'react-router-dom';

import queryString from 'query-string';

import Table from 'react-bootstrap/Table';
import './styles.css';

export default class Modelo extends Component {
  state = {
    model: {},
    price: {},
  }

  async componentDidMount() {
    const values = await queryString.parse(this.props.location.search);

    const response = await api.get(
      `/cars/toyota?modelo=${values.modelo}&ano=${values.ano}&versao=${values.versao}&estado=${values.estado}`
    );

    this.setState({ model: response.data.carro[0], price: response.data.carro[0].precos[0] });
  }

  render() {
    const { model, price } = this.state;

    return (
      <div className="model-info">
        <div className="content">
          <div className="title">
            <h5>Tabela <strong>Fipe</strong></h5>
            <Link to={`/`}>
              <img src="https://fipeexample.s3.amazonaws.com/back.svg" alt="back" />
              <span>Voltar</span>
            </Link>
          </div>
          <div className="info">
            <p>{model.modelo} {model.versao} {model.ano}</p>
          </div>
          <div className="image-car">
            <img src={model.imagemUrl} alt={model.modelo} />
          </div>
          <div className="list-price">
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Estado({model.estado})</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Minímo</th>
                  <td>{price.precoMinimo}</td>
                </tr>
                <tr>
                  <th>Médio</th>
                  <td>{price.precoMedio}</td>
                </tr>
                <tr>
                  <th>Máximo</th>
                  <td>{price.precoMaximo}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}