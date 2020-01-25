import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import bananinion from '../images/bananinion.jpg';
import dupla from '../images/dupla.png';
import fofinion from '../images/fofinion.png';
import havainion from '../images/havainion.png';
import sozinion from '../images/sozinion.png';
import original from '../images/original.jpg';
import roxinion from '../images/roxinion.jpg';



export default function Home(props) {
 
  const [minions, setMinions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
  async function onLoad() {
    if (!props.isAuthenticated) {
      return;
    }

    try {
      const minions = await loadMinions();
      setMinions(minions);
    } catch (e) {
      alert(e);
    }

    setIsLoading(false);
  }

  onLoad();
}, [props.isAuthenticated]);

function loadMinions() {
  return API.get("minions", "/minions");
}

function renderMinionsList(minions) {
  return [{}].concat(minions).map((minion, i) =>
    i !== 0 ? (
      <LinkContainer key={minion.minionId} to={`/minions/${minion.minionId}`}>
        <ListGroupItem header={minion.name}>
        {"Nome do MINION: " + (minion.name)}
          {" Reserva feita em: " + new Date(minion.createdAt).toLocaleString()}
        </ListGroupItem>
      </LinkContainer>
    ) : (
      <LinkContainer key="new" to="/minions/new">
        <ListGroupItem>
          <h4>
            <b>{"\uFF0B"}</b> Faça uma reserva
          </h4>
        </ListGroupItem>
      </LinkContainer>
    )
  );
}

  function renderLander() {
    return (
      <div className="lander">
        <h1>Book a Minion</h1>
        <p>Quantos Minions você quiser a um clique de distância</p>      
      </div>
    );
  }

  function renderMinions() {
    return (
      <div className="minions">
        <PageHeader>Seus Minions</PageHeader>
        <ListGroup>
          {!isLoading && renderMinionsList(minions)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      <Container>
        <div className="minionList">
            <Row>
              <Col md={ {span: 3, offset: 1} }>
                <div className="bananinion">
                  <img src={bananinion}/>
                    <h3>Bananinion</h3>
                      <p>Minions ipsum baboiii bananaaaa daa. Hana dul sae para tú bee do bee do bee do ti aamoo! Tulaliloo chasy bee do bee do bee do poulet tikka masala ti aamoo! Gelatooo. Aaaaaah pepete baboiii underweaaar belloo! Poulet tikka masala. Potatoooo ti aamoo! Underweaaar butt ti aamoo! Jeje bananaaaa gelatooo.
                      </p>
                </div>
                <div className="fofinion">
                  <img src={fofinion}/>
                    <h3>Fofinion</h3>
                      <p>Minions ipsum baboiii bananaaaa daa. Hana dul sae para tú bee do bee do bee do ti aamoo! Tulaliloo chasy bee do bee do bee do poulet tikka masala ti aamoo! Gelatooo. Aaaaaah pepete baboiii underweaaar belloo! Poulet tikka masala. Potatoooo ti aamoo! Underweaaar butt ti aamoo! Jeje bananaaaa gelatooo.
                      </p>
                </div>
                <div className="havainion">
                  <img src={havainion}/>
                    <h3>Havainion</h3>
                      <p>Minions ipsum baboiii bananaaaa daa. Hana dul sae para tú bee do bee do bee do ti aamoo! Tulaliloo chasy bee do bee do bee do poulet tikka masala ti aamoo! Gelatooo. Aaaaaah pepete baboiii underweaaar belloo! Poulet tikka masala. Potatoooo ti aamoo! Underweaaar butt ti aamoo! Jeje bananaaaa gelatooo.
                      </p>
                </div>
                
              </Col>

            </Row>
            <div className="dupla">
              <img src={dupla}/>
                <h3>Duplinion</h3>
                  <p>Minions ipsum baboiii bananaaaa daa. Hana dul sae para tú bee do bee do bee do ti aamoo! Tulaliloo chasy bee do bee do bee do poulet tikka masala ti aamoo! Gelatooo. Aaaaaah pepete baboiii underweaaar belloo! Poulet tikka masala. Potatoooo ti aamoo! Underweaaar butt ti aamoo! Jeje bananaaaa gelatooo.
                  </p>
            </div>
            <div className="roxinion">
              <img src={roxinion}/>
                <h3>Roxinion</h3>
                  <p>Minions ipsum baboiii bananaaaa daa. Hana dul sae para tú bee do bee do bee do ti aamoo! Tulaliloo chasy bee do bee do bee do poulet tikka masala ti aamoo! Gelatooo. Aaaaaah pepete baboiii underweaaar belloo! Poulet tikka masala. Potatoooo ti aamoo! Underweaaar butt ti aamoo! Jeje bananaaaa gelatooo.
                  </p>
            </div>
            <div className="original">
              <img src={original}/>
                <h3>Carminion</h3>
                  <p>Minions ipsum baboiii bananaaaa daa. Hana dul sae para tú bee do bee do bee do ti aamoo! Tulaliloo chasy bee do bee do bee do poulet tikka masala ti aamoo! Gelatooo. Aaaaaah pepete baboiii underweaaar belloo! Poulet tikka masala. Potatoooo ti aamoo! Underweaaar butt ti aamoo! Jeje bananaaaa gelatooo.
                  </p>
            </div>
            <div className="sozinion">
              <img src={sozinion}/>
                <h3>Sozinion</h3>
                  <p>Minions ipsum baboiii bananaaaa daa. Hana dul sae para tú bee do bee do bee do ti aamoo! Tulaliloo chasy bee do bee do bee do poulet tikka masala ti aamoo! Gelatooo. Aaaaaah pepete baboiii underweaaar belloo! Poulet tikka masala. Potatoooo ti aamoo! Underweaaar butt ti aamoo! Jeje bananaaaa gelatooo.
                  </p>
            </div>
        </div>
      </Container>
      {props.isAuthenticated ? renderMinions() : renderLander()}
    </div>

  );
}
