import React from 'react'

const KeyPage = () => (
  <div className="container">
    <div className="row align-items-center mb-5">
      <div className="col-12">
        <h4 className="mb-4">Workspace</h4>
        <p>
          Workspace are best described as NLU (Natural Language Understanding)
          modules. They can be used by your app, product, or service to
          transform natural user requests into actionable data. This
          transformation occurs when a user input matches one of the intents
          inside your workspace. Intents are the predefined or developer-defined
          components of workspace that process user requests. Workspace can be
          designed to manage a conversation flow with the help of contexts,
          intents, entities. <br />
          <br />Choose a unique name for your workspace and set the relevant
          settings.
        </p>
        <ul>
          <li>Default Language</li>
          <li>Default Country</li>
          <li>Default Project Type</li>
        </ul>
      </div>
    </div>
    <div className="row mb-5">
      <div className="col-12">
        <h4 className="mb-4">Intents</h4>
        <p>
          An intent represents a mapping between what a user says and what
          action should be taken by your software. Intent interfaces have the
          following sections: <br />
          <br />
          <ul>
            <li>
              User Says: Each User says expression can consist one of more
              templates (surrounded by {}). Utterances are written in natural
              language with direct references to entities so that parameter
              values can be extracted. i.e., entity names are surrounded with
              the {} sign. And remember: the more examples you add, the smarter
              your agent becomes. There should be at least 20 utterances per
              intent <br />
            </li>
            <br />
            <li>
              Dialog: To simplify your code for collecting and confirming entity
              values, create a dialog model. This identifies the prompts to
              collect and confirm the entity values
            </li>
          </ul>
        </p>
      </div>
    </div>
    <div className="row mb-5">
      <div className="col-12">
        <h4 className="mb-4">Entities</h4>
        <p>
          Entities are powerful tools used for extracting parameter values from
          natural language inputs. Any important data you want to get from a
          user&#39;s request, will have a corresponding entity.<br />
          <br />
          There are 2 types of entities: <b>system</b> (trained by Triniti) or
          &nbsp;<b>developer</b> (defined by a developer). Entities can be
          filled in automatically from the ‘Users says’ examples and templates,
          or added manually. <br />
          <br />
          <ul>
            <li>
              System Entities are pre-built entities provided by Triniti in
              order to facilitate handling the most popular common concepts.
              Below are examples of the different types of system entities.
            </li>
            <br />
            <li>
              Developer Entities You can create your own entities for your
              workspace. These entities allow for the mapping of synonyms to a
              reference value. For example, a card type entity could have an
              entry with a reference value of &quot;platinum edge card&quot;
              with synonyms of &quot;platinum card&quot; and &quot;edge
              card&quot;.
            </li>
          </ul>
        </p>
      </div>
    </div>
  </div>
)
export default KeyPage
