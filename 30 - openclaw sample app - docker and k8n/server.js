import express from "express";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users(
        id TEXT PRIMARY KEY,
        email TEXT
        ) 
        `
    );
    db.run(`
        CREATE TABLE IF NOT EXISTS agents(
        id TEXT PRIMARY KEY,
        usr_id TEXT,
        status TEXT,
        created_at TEXT
        )
        `)
})

import {v4 as uuidv4 } from "uuid"
import { Queue } from "bullmq";
import {Redis} from "ioredis"


const app = express();
app.use(express.json());

const connection = new Redis();
const agentQueue = new Queue("agentquuuueee", {
    connection
})

app.post('/agents', (req, res) =>{
    const {usr_id} = req.body;
    const agent_id = uuidv4();
    db.run(
        "insert into agents (id, usr_id, status, created_at) values(?,?,?,?)",
        [agent_id, usr_id, "pending", new Date().toISOString()]
    );

    agentQueue.add("pending_task", {agent_id});

    res.json({
        agent_id_bro: agent_id,
        status:"Pending task json"
    })

})


// Control plane API
import {k8s} from "@kubernetes/client-node"

// Load kubeconfig
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
const coreApi = kc.makeApiClient(k8s.CoreV1Api);

app.post("/agents", async (req, res) => {
  const userId = req.body.user_id;
  const agentId = uuidv4();
  const namespace = `user-${userId}`;

  try {
    // Create namespace if not exists
    await coreApi.createNamespace({
      metadata: { name: namespace }
    }).catch(() => {});

    // Create deployment
    await k8sApi.createNamespacedDeployment(namespace, {
      metadata: { name: `agent-${agentId}` },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: { app: `agent-${agentId}` }
        },
        template: {
          metadata: {
            labels: { app: `agent-${agentId}` }
          },
          spec: {
            containers: [
              {
                name: "agent",
                image: "mini-agent",
                ports: [{ containerPort: 3001 }]
              }
            ]
          }
        }
      }
    });

    res.json({ agentId, status: "provisioning" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating agent");
  }
});


app.listen(3000, () => {
  console.log("API running on port 3000");
});