import React from "react";
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

const formatCards = cards => {
  const cardsPerRow = Math.ceil(cards.length / BOARD_ROWS);

  return cards.map((card, index) => ({
    id: `card_${card.idShort}`,
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
        content: `${formatCardTitle(card.name)}`,
        margin: {
          bottom: 30,
          left: 20,
          right: 20,
          top: 30
        },
        width: 180
      }
    ],
    expandIcon: {
      shape: "ArrowDown",
      width: 10,
      height: 10
    },
    collapseIcon: {
      shape: "ArrowUp",
      width: 10,
      height: 10
    },
    style: {
      strokeWidth: 2
    },
    constraints: NodeConstraints.Default & ~NodeConstraints.Rotate
  }));
};

const connectors = [];

const DependencyGraph = ({ cards }) => {
  let diagramInstance = null;

  const addConnection = (sourceId, targetId) => {
    if (diagramInstance) {
      const connectionId = `${sourceId}-${targetId}`;
      const existingConnection = diagramInstance.connectors.find(
        connection => connection.id === connectionId
      );

      if (existingConnection.length > 0) {
        console.log(
          `A connection from ${sourceId} to ${targetId} already exists`
        );
        return;
      }
      diagramInstance.connectors = [
        ...diagramInstance.connectors,
        {
          id: connectionId,
          sourceID: `${sourceId}`,
          targetID: `${targetId}`,
          type: "Orthogonal",
          style: {
            strokeWidth: 2
          }
        }
      ];
      diagramInstance.dataBind();
    }
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
    <DiagramComponent
      id="diagram"
      width="100%"
      height={window.innerHeight - 100}
      ref={diagram => (diagramInstance = diagram)}
      nodes={formatCards(cards)}
      connectors={connectors}
      created={fitDiagramToPage}
      mouseLeave={fitDiagramToPage}
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
