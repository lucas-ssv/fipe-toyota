import React, { Component } from 'react';
import api from '../../services/api';

import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './styles.css';

export default class Main extends Component {
  state = {
    models: [],
    query: "",
    modelo: "",
    ano: "",
    versao: "",
  }

  componentDidMount() {
    this.loadModels();
  }

  loadModels = async (query, modelo, ano, versao) => {
    const response = await api.get(`cars/toyota/models/${query}`);

    const { modelos } = response.data;

    this.setState({ models: modelos, modelo, ano, versao });
  }

  searchCarYear = () => {
    let { query, modelo, ano, versao } = this.state;

    let btn = document.querySelector(".btn-avaliar");

    modelo = document.querySelector(".models").value;
    ano = document.querySelector(".years").value;
    versao = document.querySelector(".versions").value;

    if (modelo !== "Selecione..." && ano !== "Selecione..." && versao !== "Selecione...") {
      btn.removeAttribute("disabled");
    } else {
      btn.setAttribute("disabled", "disabled");
    }

    query = `versions/ano?modelo=${modelo}&ano=${ano}&versao=${versao}&estado=SP`;

    this.loadModels(query, modelo, ano, versao);
  }

  render() {
    const { models, modelo, ano, versao } = this.state;

    return (
      <section className="main-section">
        <div className="content">
          <div className="models-list">
            <Form>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  className="models"
                  onChange={this.searchCarYear} as="select" custom>
                  <option>Selecione...</option>
                  <option>Corolla</option>
                  <option>Etios</option>
                  <option>Hilux</option>
                  <option>Prius</option>
                  <option>Rav4</option>
                  <option>SW4</option>
                </Form.Control>
                <Form.Label>Ano</Form.Label>
                <Form.Control
                  className="years"
                  onChange={this.searchCarYear}
                  as="select" custom>
                  <option>Selecione...</option>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                  <option>2020</option>
                </Form.Control>
                <Form.Label>Versão</Form.Label>
                <Form.Control className="versions"
                  onChange={this.searchCarYear}
                  as="select" custom>
                  <option>Selecione...</option>
                  {models.map(modelo => (
                    <option value={modelo.versao} key={modelo._id}>{modelo.versao}</option>
                  ))}
                </Form.Control>
                <Form.Label>Estado</Form.Label>
                <Form.Control className="states" as="select" custom>
                  <option>SP</option>
                </Form.Control>
              </Form.Group>

              <Link to={`/cars/toyota?modelo=${modelo}&ano=${ano}&versao=${versao}&estado=SP`}>
                <Button className="btn-avaliar" variant="dark" disabled>Avaliar</Button>
              </Link>
            </Form>
          </div>
        </div>
      </section>
    );
  }
};