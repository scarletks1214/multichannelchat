import React from 'react'

import DocImage1 from '../../assets/images/train.png'
import DocImage2 from '../../assets/images/architecture.png'

const Architecture = () => (
  <div className="container">
    <div className="row align-items-center mb-5">
      <div className="row mb-5">
        <div className="col-12">
          <h1 className="mb-4">Operation of Triniti’s AI engine</h1>
          <ul>
            <li>
              A chat or voice application that resides on a banking website for
              example, sends
            </li>
            conversational input to the bank’s system.
            <li>
              The system interacts with the Triniti workspace to decipher the
              input.
            </li>
            <li>
              The interpretation of the input facilitates fulfilment by the
              system which then sends conversational output to the application.
            </li>
          </ul>
        </div>
        <div className="col-12">
          <img className="img-fluid" src={DocImage2} alt="Landing 2" />
        </div>
      </div>
      <div className="col-12">
        <h1>Integrating Triniti into your application</h1>
        <p>
          <br />Triniti is extremely flexible. It includes pre-built integration
          tools to suit varying requirements and capabilities. For example, you
          can select tool like translation, comprehension, sentiment analysis
          etc.. to incorporate the engine into your application.
          <br />
          <br />
          Integration typically requires three steps:
          <ul>
            <br />
            <li>
              <b>Prepare your data</b>: Connect to your data sources to enable
              data ingestion.{' '}
            </li>
            <li>
              <b>Train your data</b>: Build a workspace to analyse, understand
              and train your data.
            </li>
            <li>
              <b>Deploy your application</b>: Track the performance of your
              workspace in your deployed application.
            </li>
          </ul>
        </p>
      </div>
      <div className="col-12">
        <img className="img-fluid" src={DocImage1} alt="Landing 1" />
      </div>
    </div>
  </div>
)
export default Architecture
