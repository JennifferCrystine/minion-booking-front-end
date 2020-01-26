import React, { useRef, useState } from "react";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import NumericInput from 'react-numeric-input';
import EmailInputField from '@mitchallen/react-email-input-field';
import { s3Upload } from "../libs/awsLib";
import { API } from "aws-amplify";
import "./NewMinion.css";



export default function NewMinion(props) {
  const file = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return name.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      const attachment = file.current
        ? await s3Upload(file.current)
        : null;
  
      await createMinion({ name, quantity, email });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createMinion(minion) {
    return API.post("minions", "/minions", {
      body: minion
    });
  }

  function getInputValues (){
    const getName = this.name;
    const getEmail = this.email;
    const getQuantity = this.quantity;
  }

  function onNameChange (event){
    return this.setState({name: event.target.value})
  }

  function onEmailChange (event){
    return this.setState({email: event.target.value})
  }

  function onQuantityChange (event){
    return this.setState({quantity: event.target.value})
  }


  return (
    <div className="NewMinion">
  <form onSubmit={handleSubmit}>
        <FormGroup controlId="name">
        <ControlLabel>Nome<span> (do minion)</span></ControlLabel>
          <FormControl
            value={name}
            type="text"
            onChange={e => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </FormGroup>
        <FormGroup controlId="e-mail">
        <ControlLabel>Email<span> (lembre-se de inserir um email válido!)</span></ControlLabel>
          <FormControl 
              value={email}
              type="email" 
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"              
          /> 
        </FormGroup>
        <FormGroup controlId="quantity">
        <ControlLabel>Quantidade</ControlLabel>
        <FormControl 
              value={quantity}
              type="number" 
              onChange={e => setQuantity(e.target.value)}
              placeholder="Quantos minions você quer?"              
          /> 
        </FormGroup>
      
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Reservar!
        </LoaderButton>
      </form>
    </div>
  );
}