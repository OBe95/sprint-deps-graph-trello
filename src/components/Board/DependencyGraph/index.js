import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

import {
  DiagramComponent,
  NodeConstraints,
  PrintAndExport,
  ConnectorBridging,
  UndoRedo,
  ConnectorEditing,
  Inject
} from "@syncfusion/ej2-react-diagrams";
import DependencyForm from "components/Board/DependencyGraph/DependencyForm";

const BOARD_ROWS = 4;
const MAX_TITLE_LENGTH = 80;
const MAX_TITLE_LENGTH_PER_PART = 40;

const formatCardTitle = title => {
  if (title.length > MAX_TITLE_LENGTH) {
    return `${title.substr(0, MAX_TITLE_LENGTH_PER_PART - 2)}...${title.substr(
      title.length - MAX_TITLE_LENGTH_PER_PART - 1
    )}`;
  }
  return title;
};

const formatCardId = cardId => `card-${cardId}`;

const formatConnectorId = (sourceId, targetId) =>
  `connector-${sourceId}-${targetId}`;

const formatCards = cards => {
  const cardsPerRow = Math.ceil(cards.length / BOARD_ROWS);

  return cards.map((card, index) => ({
    id: formatCardId(card.idShort),
    width: 200,
    height: 75,
    offsetX: 225 * (index % cardsPerRow) + 25,
    offsetY: 95 * Math.floor(index / cardsPerRow) + 25,
    pivot: {
      x: 0,
      y: 0
    },
    annotations: [
      {
        content: `#${card.idShort}`,
        style: {
          bold: true
        },
        offset: {
          x: 0.08,
          y: 0.11
        }
      },
      {
        content: formatCardTitle(card.name),
        margin: {
          bottom: 30,
          left: 20,
          right: 20,
          top: 30
        },
        width: 180
      }
    ],
    style: {
      strokeWidth: 2
    },
    // eslint-disable-next-line no-bitwise
    constraints: NodeConstraints.Default & ~NodeConstraints.Rotate
  }));
};

const getConnectors = diagramInstance =>
  diagramInstance ? diagramInstance.connectors : [];

const getNodes = (diagramInstance, cards) =>
  diagramInstance ? diagramInstance.nodes : formatCards(cards);

const DependencyGraph = ({ cards }) => {
  const [diagramInstance, setDiagramInstance] = useState(null);
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);

  const addConnector = (sourceId, targetId) => {
    if (diagramInstance) {
      const connectionId = formatConnectorId(sourceId, targetId);
      const existingConnection = diagramInstance.connectors.find(
        connection => connection.id === connectionId
      );

      if (existingConnection) {
        // TODO display a toaster
        console.log(
          `A connection from ${sourceId} to ${targetId} already exists`
        );
        return;
      }
      diagramInstance.connectors = [
        ...diagramInstance.connectors,
        {
          id: connectionId,
          sourceID: formatCardId(sourceId),
          targetID: formatCardId(targetId),
          style: {
            strokeWidth: 2
          }
        }
      ];
    }
  };

  const addConnectors = (sourceIds, targetIds) => {
    sourceIds.map(sourceId => {
      targetIds.map(targetId => {
        addConnector(sourceId, targetId);
        return targetId;
      });
      return sourceId;
    });
  };

  const handleSubmitDependencyForm = () => {
    addConnectors(
      selectedSources.map(source => source.value),
      selectedTargets.map(target => target.value)
    );
    setSelectedSources([]);
    setSelectedTargets([]);
  };

  const bringToFront = () => {
    if (diagramInstance) {
      diagramInstance.bringToFront();
    }
  };

  const fitDiagramToPage = () => {
    if (diagramInstance) {
      diagramInstance.fitToPage({
        mode: "Page",
        region: "Content",
        margin: {
          bottom: 50
        },
        canZoomIn: true
      });
    }
  };

  return (
    <Fragment>
      <DependencyForm
        cards={cards}
        selectedTargets={selectedTargets}
        setSelectedTargets={setSelectedTargets}
        selectedSources={selectedSources}
        setSelectedSources={setSelectedSources}
        handleSubmit={handleSubmitDependencyForm}
      />

      <DiagramComponent
        id="diagram"
        width="100%"
        height={window.innerHeight - 100}
        ref={setDiagramInstance}
        nodes={getNodes(diagramInstance, cards)}
        connectors={getConnectors(diagramInstance)}
        created={fitDiagramToPage}
        click={bringToFront}
      >
        <Inject
          services={[
            PrintAndExport,
            ConnectorBridging,
            UndoRedo,
            ConnectorEditing
          ]}
        />
      </DiagramComponent>
    </Fragment>
  );
};

DependencyGraph.defaultProps = {
  cards: []
};

DependencyGraph.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      idShort: PropTypes.number
    })
  )
};

export default DependencyGraph;
