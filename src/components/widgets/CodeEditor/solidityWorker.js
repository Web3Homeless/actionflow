importScripts("https://binaries.soliditylang.org/bin/soljson-v0.8.19+commit.7dd6d404.js");
import wrapper from "solc/wrapper";

self.addEventListener(
  "message",
  (e) => {
    const contractCode = e.data.contractCode;
    const sourceCode = {
      language: "Solidity",
      sources: {
        contract: {
          content: contractCode,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };

    console.log("Solc started!");

    const compiler = wrapper(self.Module);
    console.log(`Solc version: ${compiler.version()}`);

    // Compile the Solidity code
    const output = JSON.parse(compiler.compile(JSON.stringify(sourceCode)));

    // Post the result back to the main thread
    self.postMessage({ output });
  },
  false,
);
