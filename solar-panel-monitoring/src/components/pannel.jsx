import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormLabel, Pagination } from "react-bootstrap";


function Pannel() {
  const [panelsData, setPanelsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();

      setPanelsData(data);
    };

    const interval = setInterval(fetchData, 5000);

    fetchData();

    return () => clearInterval(interval);
  }, []);

  console.log(panelsData,"panelsData")

  const renderPanel = (panel) => {
    const isWeak = panel.voltage < 10 && panel.wattage < 200;

    return (
      <div key={panel.id} className={`panel ${isWeak ? 'weak' : 'healthy'}`}>
          <ul>
            <li className="panelVoltage">Panel <span>{panel.id}</span></li>
            <li className="panelVoltage">Voltage <span>{panel.voltage} V</span> </li>
            <li className="panelVoltage">Wattage<span>{panel.wattage} W</span></li>
          </ul>
      </div>
    );
  };

  const countView = () => {
    const weakPanels = panelsData.filter(panel => panel.voltage < 10 && panel.wattage < 200);
    return {
      healthy: panelsData.length - weakPanels.length,
      weak: weakPanels.length
    };
  };

  const healthStatus = countView();

  return (
    <div className="App">
      <div className="farmOverview">
        <h2>Farm Overview</h2>
        <Row>
          <Col sm={4} className="farmView">
              <h3>Total Energy: </h3>
              <p>{panelsData.reduce((total, panel) => total + parseFloat(panel.energy.replace('kWh', '').replace(',', '')), 0)} <span>kWh</span></p>
          </Col>
          <Col sm={4} className="farmView">
              <h3>Total Energy: </h3>
              <p>{panelsData.reduce((total, panel) => total + parseFloat(panel.energy.replace('kWh', '').replace(',', '')), 0)} <span>kWh</span></p>
          </Col>
          <Col sm={4} className="farmView">
              <h3>Total Energy: </h3>
              <p>{panelsData.reduce((total, panel) => total + parseFloat(panel.energy.replace('kWh', '').replace(',', '')), 0)} <span>kWh</span></p>
          </Col>
        </Row>
          {/* <div className="farmInfo">
            <div className="farmView">
              <h3>Total Energy: </h3>
              <p>{panelsData.reduce((total, panel) => total + parseFloat(panel.energy.replace('kWh', '').replace(',', '')), 0)}<span>kWh</span></p>
            </div>
            <div className="farmView">
              <h3>Healthy Panels: </h3>
              <p>{healthStatus.healthy}</p>
            </div>
            <div className="farmView">
              <h3>Weak Panels:</h3>
              <p>{healthStatus.weak}</p>
            </div>
        </div> */}
      </div>
      <div className="panel-grid">
        {panelsData.map(renderPanel)}
      </div>
    </div>
  );
}

export default Pannel;
