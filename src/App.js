import "./App.scss";
import mxgraph from "./graph";
import { useRef, useLayoutEffect } from "react";
import { genGraph } from "./graph/Graph.js";
let graph = null;
const { mxEvent, mxRubberband } = mxgraph;

const App = () => {
  const containerRef = useRef();

  useLayoutEffect(() => {
    const container = containerRef.current;
    graph = genGraph(container);
    // 禁用鼠标右键
    mxEvent.disableContextMenu(container);
    // 设置这个属性后节点之间才可以连接
    graph.setConnectable(true);
    // 开启区域选择
    new mxRubberband(graph);

    const parent = graph.getDefaultParent();
    graph.getModel().beginUpdate();
    try {
      const v1 = graph.insertVertex(parent, null, "Hello,", 20, 20, 80, 30);
      const v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30);
      graph.insertEdge(parent, null, "30%", v1, v2);
    } finally {
      graph.getModel().endUpdate();
    }
  }, []);

  return <div ref={containerRef} id="graphContainer"></div>;
};

export default App;
