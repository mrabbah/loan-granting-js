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

// create a handler for the task
const handler = async ({ task, taskService }) => {
  // get task variable 'defaultScore'
  const defaultScore = task.variables.get("defaultScore");

  // set process variable 'creditScores'
  const creditScores = [defaultScore, 9, 1, 4, 10];
  const processVariables = new Variables()
    .set("creditScores", creditScores)
    .set("bar", new Date());

  // complete the task
  try {
    await taskService.complete(task, processVariables);
    console.log("I completed my task successfully!!");
  } catch (e) {
    console.error(`Failed completing my task, ${e}`);
  }
};

// susbscribe to the topic 'creditScoreChecker' & provide the created handler
client.subscribe("creditScoreChecker", handler);

client.subscribe("requestRejecter", async ({ task, taskService }) => {
  console.log(task.variables.get("bar"));
  console.log(task.variables.get("score"));
  await taskService.complete(task);
});

client.subscribe("loanGranter", async ({ task, taskService }) => {
  console.log(task.variables.get("bar"));
  console.log(task.variables.get("score"));
  await taskService.complete(task);
});
