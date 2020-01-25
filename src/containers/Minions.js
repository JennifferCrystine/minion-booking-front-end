import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import NumericInput from 'react-numeric-input';
import "./Minions.css";

export default function Minions(props) {
  const file = useRef(null);
  const [minion, setMinion] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [quantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadMinion() {
      return API.get("minions", `/minions/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const minion = await loadMinion();
        const { name, attachment } = minion;

        if (attachment) {
          minion.attachmentURL = await Storage.vault.get(attachment);
        }

        setName(name);
        setMinion(minion);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return name;
  }
  
  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  function saveMinion(minion) {
    return API.put("minionss", `/minionss/${props.match.params.id}`, {
      body: minion
    });
  }
  
  function saveMinion(minion) {
    return API.put("minions", `/minions/${props.match.params.id}`, {
      body: minion
    });
  }
  
  async function handleSubmit(event) {
    let attachment;
  
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
      if (file.current) {
        attachment = await s3Upload(file.current);
      }
  
      await saveMinion({
        name, quantity,
        attachment: attachment || minion.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteMinion() {
    return API.del("minions", `/minions/${props.match.params.id}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this minion?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteMinion();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Minions">
      {minion && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="name">
          <ControlLabel>Nome</ControlLabel>
            <FormControl
              value={name}
              componentClass="textarea"
              onChange={e => setName(e.target.value)}
            />
          </FormGroup>
          {minion.attachment && (
            <FormGroup>
              <ControlLabel>Arquivo</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={minion.attachmentURL}
                >
                  {formatFilename(minion.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
           <FormGroup controlId="quantity">
           <ControlLabel>Quantidade</ControlLabel>
            <NumericInput min={0} max={10}/>
          </FormGroup>
          <FormGroup controlId="file">
            {!minion.attachment && <ControlLabel>Arquivo</ControlLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}