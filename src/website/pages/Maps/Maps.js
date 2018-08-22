import React, { Component } from 'react';
import './Maps.css';
import { ContentWrapper } from '../../components'
import {Helmet} from "react-helmet";
import ReactTooltip from 'react-tooltip'
// import DragAndZoom from 'react-drag-and-zoom'
// import Konva from "konva";
// import { Stage, Layer, Rect, Text, Line } from "react-konva";

class Maps extends Component {
  state={
    scale: 0.5
  }

  snapToGrid(e){
    var x = (e.nativeEvent.offsetX),
    y = (e.nativeEvent.offsetY)
    let ctx = this.LayerThree.getContext('2d')
    ctx.clearRect(0, 0, 5000, 5000);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,255,255,1)";
    
    ctx.strokeRect(Math.round(x/5)*5+0.5,Math.round(y/5)*5+0.5,5,5);

    x = x/5-500
    y = y/5-500

    if(y < 0)
      y = Math.abs(y)
    else
      y = -y
    y = Math.round(y)
    x = Math.round(x)
    // console.log(x,y)
    this.setState({x,y})
  }

  componentDidMount() {
    let ctx = this.LayerTwo.getContext('2d')
    for (var x = 0.5; x < 5001; x += 50) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 5000);
      ctx.moveTo(0, x);
      ctx.lineTo(5000, x);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.stroke();

    ctx = this.LayerOne.getContext('2d')
    for (var x = 0.5; x < 5001; x += 500) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 5000);
      ctx.moveTo(0, x);
      ctx.lineTo(5000, x);
    }
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.stroke();

    // this.setState({rects})

    this.mapContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      let scaleBy = 1.3
      var rect = this.mapContainer.getBoundingClientRect();

      let x = e.clientX - rect.left
      let y = e.clientY - rect.top

      var newScale = e.deltaY < 0 ? this.state.scale * scaleBy : this.state.scale / scaleBy;

      if(newScale > 4.1 || newScale < 0.13)
        return
      this.mapContainer.style.transform = "scale("+newScale+")"
      // this.LayerTwo.style.transform = "scale("+newScale+")"
      // this.LayerThree.style.transform = "scale("+newScale+")"
      this.setState({scale: newScale})
      if(newScale >= 1 && newScale < 3){
        this.LayerOne.style.opacity = 1;
        this.LayerTwo.style.opacity = 1;
        this.LayerThree.style.opacity = 0;
      }else if(newScale >= 3){
        this.LayerTwo.style.opacity = 0.5;
        this.LayerOne.style.opacity = 0;
        this.LayerThree.style.opacity = 1;
      }else{
        this.LayerOne.style.opacity = 1;
        this.LayerThree.style.opacity = 0;
        this.LayerTwo.style.opacity = 0;
      }
    });

  }
  render() {
    return (
      <ContentWrapper fill exact>
        <Helmet>
          <title>Maps</title>
        </Helmet>

        <div className="MapContainer" ref={ref => { this.mapContainer = ref; }}>
          <canvas style={{opacity: 0}}  width="5000px" height="5000px" ref={ref => { this.LayerThree = ref; }} ></canvas>
          <canvas style={{opacity: 0}}  width="5000px" height="5000px" ref={ref => { this.LayerTwo = ref; }} ></canvas>
          <canvas  data-tip data-for='global' onMouseMove={this.snapToGrid.bind(this)} width="5000px" height="5000px" ref={ref => { this.LayerOne = ref; }} ></canvas>
        </div>
        <ReactTooltip id='global' aria-haspopup='true' role='example'>
        {this.state.x} : {this.state.y}
        </ReactTooltip>
      </ContentWrapper>
    );
  }
}

export default Maps;
    // this.stageRef.addEventListener("mousemove", (x)=>console.log(x));
//     console.log(this.stageRef.getStage());
//     let stage = this.stageRef.getStage()
//     var scaleBy = 1.01;
//     window.addEventListener('wheel', (e) => {
//       e.preventDefault();
//       var oldScale = stage.scaleX();
      
//       var mousePointTo = {
//           x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
//           y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
//       };

//       var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
//       console.log(newScale)
// if(newScale <= 1)
//         return
//         if(newScale >= 2 && newScale < 4 )
//           this.setState({secondLayer: true, firstLayer: true, thirdLayer: null})
//         else if(newScale >= 4  )
//           this.setState({secondLayer: true, firstLayer: true, thirdLayer: true})
//         else
//           this.setState({secondLayer: null, firstLayer: true, thirdLayer: null})

          
//       stage.scale({ x: newScale, y: newScale });
//       var newPos = {
//           x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
//           y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
//       };
//       stage.position(newPos);
//       stage.batchDraw();
//     });
// {/*         
//         <DragAndZoom
//           minZoom={40}
//           initialZoom={80}
//           maxZoom={2000}
//           className="MapContainer"
//           bounds={{ left:-1000, top:-1000, right: 0, bottom: 0 }}
//           zoomStep={this.state.zoomStep}
//           onZoom={this.onZoom.bind(this)}
//         >
//           <div className="Map" style={{}}>
//             <svg width="1000px" height="1000px" xmlns="http://www.w3.org/2000/svg" ref={ref => { this.stageRef = ref; }}>
//               <defs>
//                 <pattern id="smallerGrid" width="1" height="1" patternUnits="userSpaceOnUse">
//                   <path d="M 1 0 L 0 0 0 1" fill="none" stroke="gray" strokeWidth="0.1"/>
//                 </pattern>
//                 <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
//                 <rect width="10" height="10" fill={this.state.thirdLayer ? "url(#smallerGrid)":"none"} />
//                   <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.3"/>
//                 </pattern>
//                 <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
//                   <rect width="100" height="100" fill={this.state.secondLayer ? "url(#smallGrid)":"none"}/>
//                   <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" strokeWidth="0.5"/>
//                 </pattern>
//               </defs>

//               <rect class="tests" width="1000px" height="1000px" fill="url(#grid)" />
//             </svg>
//           </div>
//         </DragAndZoom> */}
      // {/* <Stage width={1000} height={1000} ref={ref => { this.stageRef = ref; }} >
      
      //   {this.state.firstLayer && <Layer
      //   draggable
      //   >
      //     {
      //       Array.from({ length:100 }, (v, x) => (
      //         Array.from({ length:100 }, (v, y) => <Rect 
      //           className="test"
      //           x={x*10} 
      //           y={y*10} 
      //           width={10} 
      //           height={10}
      //           key={ x.toString()+y.toString() } 
      //           fill="rgba(0,0,255,0.3)"
      //           strokeWidth={1} 
      //           stroke="rgb(0,0,0)"
      //           />)
      //       ))
      //     }
      //   </Layer>}
      // </Stage> */}