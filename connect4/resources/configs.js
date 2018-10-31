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
      human: "yellow",
      machine: "red",
      box: "blue",
      shadow: "darkblue"
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
      human: "orange",
      machine: "pink",
      box: "green",
      shadow: "darkgreen"
    }
  }
};