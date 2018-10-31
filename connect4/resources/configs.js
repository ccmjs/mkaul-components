ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    html: {
      main: {
        inner: [
          { tag: 'h1', inner: 'Connect Four!' },
          { tag: "svg" }
        ]
      }
    },
    color: {
      human: "#ffff00", // "yellow",
      machine: "#ff0000", // "red",
      box: "#0080ff", // "blue",
      shadow: "#0000ff" // "darkblue"
    }
  },
  "green": {
    key: "green",
    html: {
      main: {
        inner: [
          { tag: 'h1', inner: 'Vier gewinnt!' },
          { tag: "svg" }
        ]
      }
    },
    color: {
      human: "#FFA500", // "orange",
      machine: "#FFC0CB", // "pink",
      box: "#00ff00", // "green",
      shadow: "#A9A9A9", // "darkgreen"
    }
  }
};