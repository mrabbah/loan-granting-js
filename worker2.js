import { Client, logger, Variables } from "camunda-external-task-client-js";

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {
  baseUrl: "http://192.168.8.104:8080/engine-rest",
  use: logger,
};

// create a Client instance with custom configuration
const client = new Client(config);


client.subscribe("requestRejecter", async ({ task, taskService }) => {
  console.log(task.variables.get("bar"));
  console.log(task.variables.get("score"));
  try {
    await taskService.complete(task);
  } catch (error) {
    
  }
});

// client.subscribe("loanGranter", async ({ task, taskService }) => {
//   console.log(task.variables.get("bar"));
//   console.log(task.variables.get("score"));
//   try {
//     await taskService.complete(task);
//   } catch (error) {
    
//   }
// });
