import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    stickers: [
      { name: "react", x: 0, y: 0, dragged: false },
      { name: "vue", x: 0, y: 0, dragged: false },
      { name: "js", x: 0, y: 0, dragged: false }
    ]
  };

  onDragStart = (event, index) => {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text/plain", index);
  };

  allowDrop = event => {
    event.preventDefault();
  };

  onDrop = event => {
    const index = event.dataTransfer.getData("text/plain");
    let stickers = this.state.stickers;
    stickers[index].x = event.clientX;
    stickers[index].y = event.clientY;
    stickers[index].dragged = true;
    this.setState({ stickers });
  };

  render() {
    return (
      <div className="container">
        <div className="leftSection">
          <div className="logoContainer">
            <span className="logo">Stickers</span>
          </div>
          <div className="stickers">
            {this.state.stickers.map((sticker, index) => (
              <img
                key={index}
                draggable={true}
                onDragStart={event => this.onDragStart(event, index)}
                className="sticker"
                src={require(`./assets/${sticker.name}.png`)}
                alt={sticker.name}
                style={
                  sticker.dragged
                    ? {
                        position: "absolute",
                        left: sticker.x - 100,
                        top: sticker.y - 100
                      }
                    : {}
                }
              />
            ))}
          </div>
          <div className="buyNowButton">
            <span className="buyNow">BUY NOW</span>
          </div>
        </div>
        <div className="rightSection">
          <p className="info">
            Drag and Drop Stickers Over Laptop to select Stickers
          </p>
          <div onDragOver={this.allowDrop} onDrop={this.onDrop}>
            <img className="mac" src={require("./assets/mac.png")} alt="mac" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
