import React, { Component } from "react";
import { Field, reduxForm, submit, Form } from "redux-form";
import { Grid, Button, Select, Input } from "semantic-ui-react";

const cnpjNormalizer = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const agenciaNormalizer = (value) => {
  return value.replace(/\D/g, "").replace(/(\d{4})\d+?$/, "$1");
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = <div className="erro">⚠ Obrigatório</div>;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = <div className="erro">⚠ E-mail Invalido</div>;
  }
  if (!values.tiposSeguros) {
    errors.tiposSeguros = <div className="erro">⚠ Obrigatório</div>;
  }

  if (!values.tiposCapital) {
    errors.tiposCapital = <div className="erro">⚠ Obrigatório</div>;
  }

  if (!values.cnpj) {
    errors.cnpj = <div className="erro">⚠ Obrigatório</div>;
  } else if (values.cnpj.length !== 18) {
    errors.cnpj = <div className="erro">⚠ CNPJ inválido</div>;
  }

  if (!values.razaoSocial) {
    errors.razaoSocial = <div className="erro">⚠ Obrigatório</div>;
  }

  if (!values.numeroAgencia) {
    errors.numeroAgencia = <div className="erro">⚠ Obrigatório</div>;
  } else if (values.numeroAgencia.length !== 4) {
    errors.numeroAgencia = <div className="erro">⚠ Número inválido</div>;
  }
  return errors;
};

const renderField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <Input
    {...input}
    label={label}
    placeholder={label}
    error={touched && invalid}
    {...custom}
  />
);

const createRenderer = (render) => ({ input, meta, label, ...rest }) => (
  <div
    className={[
      meta.error && meta.touched ? "error" : "",
      meta.active ? "active" : "",
    ].join(" ")}
  >
    <label>{label}</label>
    {render(input, label, rest)}
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </div>
);

const RenderSelect = createRenderer((input, label, { children }) => (
  <select {...input}>{children}</select>
));

const colors = [
  'A Coruña',
  'Álava',
  'Albacete',
  'Alicante',
  'Almería',
  'Asturias',
  'Ávila',
  'Badajoz',
  'Balearic Islands',
  'Barcelona',
  'Burgos',
  'Cáceres',
  'Cádiz',
  'Cantabria',
  'Castellón',
  'Ciudad Real',
  'Córdoba',
  'Cuenca',
  'Guipúzcoa',
  'Gerona',
  'Granada',
  'Guadalajara',
  'Huelva',
  'Huesca',
  'Jaén',
  'La Rioja',
  'Las Palmas',
  'León',
  'Lérida',
  'Lugo',
  'Madrid',
  'Málaga',
  'Murcia',
  'Navarra',
  'Orense',
  'Palencia',
  'Pontevedra',
  'Salamanca',
  'Santa Cruz de Tenerife',
  'Segovia',
  'Sevilla',
  'Soria',
  'Tarragona',
  'Teruel',
  'Toledo',
  'Valencia',
  'Valladolid',
  'Vizcaya',
  'Zamora',
  'Zaragoza'
];

class Formulario extends Component {
  submit = (values) => {
    console.log("AJEITA ESSA PORRA");
    console.log(values);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.submit)}>
        <Grid className="formulario">
          <Grid.Row>
            <Grid.Column width={8} textAlign="right">
              <Field
                name="tiposSeguro"
                type="select"
                component={RenderSelect}
                label="Tipos de Seguro"
              >
                                <option />
                {colors.map((colors) => (
                  <option key={colors} value={colors}>
                    {colors}
                  </option>
                ))}
              </Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <Field
                type="select"
                name="tiposCapital"
                component={RenderSelect}
                label="Tipos de Capital"
              >
                <option />
                {colors.map((colors) => (
                  <option key={colors} value={colors}>
                    {colors}
                  </option>
                ))}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                maxLength={18}
                name="cnpj"
                component={renderField}
                type="text"
                label="CNPJ"
                normalize={cnpjNormalizer}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                name="razaoSocial"
                component={renderField}
                type="text"
                label="Razão Social"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                name="email"
                component={renderField}
                type="text"
                label="E-mail"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                maxLength={4}
                name="numeroAgencia"
                component={renderField}
                type="text"
                normalize={agenciaNormalizer}
                label="Número da Agencia"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                name="nomeAgencia"
                component={renderField}
                type="text"
                label="Nome da Agencia"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="botao">
            <Grid.Column width={16}>
              <Button type="submit" className="search-button">
                Enviar
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default Formulario = reduxForm({
  form: "contact",
  validate,
})(Formulario);
