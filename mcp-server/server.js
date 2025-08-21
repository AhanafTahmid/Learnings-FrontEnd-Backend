import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create an MCP server
const server = new McpServer({
  name: "chittagong-server",
  version: "1.0.0",
});

// Define the tool with proper schema
server.tool("getWeather", {
  description: "Get the latest weather and time in Chittagong",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  }
}, async () => {
  return {
    chittagongweather: '39°C',
    chittagongtime: '02:00 pm',
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);