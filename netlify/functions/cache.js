const STYLE = `
    <style amp-custom>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, 
                   sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    main {
      padding: 1rem;
      max-width: 700px;
      margin: 0 auto;
    }
    main * + * {
        margin-top: 1rem;
    }
    pre {
      padding: 1rem;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      background: #f2f2f2;
    }
    </style>
`;

module.exports = {
  STYLE,
};
