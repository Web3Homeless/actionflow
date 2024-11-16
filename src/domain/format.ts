import prettier from "prettier";
// @ts-expect-error abc
import solidityPlugin from "prettier-plugin-solidity";
import { getAddress } from "ethers";

export function dedent(str: string): string {
  const trimmedStr = str.replace(/^\n+|\n+$/g, "");
  const lines = trimmedStr.split("\n");

  const minIndent = Math.min(
    ...lines
      .filter((line) => line.trim().length > 0) // Ignore completely empty lines
      .map((line) => line.match(/^\s*/)?.[0].length || 0), // Capture leading spaces
  );

  const dedentedLines = lines.map((line) => line.slice(minIndent));
  return dedentedLines.join("\n");
}

export function addIndentation(str: string, indentLevel: number): string {
  const indent = " ".repeat(indentLevel);
  return str
    .split("\n")
    .map((line) => (line.trim().length > 0 ? indent + line : line))
    .join("\n");
}

export function indentTo(str: string, indentLevel: number): string {
  return addIndentation(dedent(str), indentLevel);
}

export async function formatSolidity(solidityCode: string): Promise<string> {
  return await prettier.format(solidityCode, {
    parser: "solidity-parse",
    plugins: [solidityPlugin],
  });
}

export function toChecksumAddress(address: string) {
  return getAddress(address);
}
