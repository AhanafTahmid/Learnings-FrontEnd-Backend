import {Redis} from "ioredis"
import sqlite3 from "sqlite3";
sqlite3.verbose();

import { Worker } from "bullmq";
import { exec } from "child_process";

const connection = new Redis({ maxRetriesPerRequest: null });
const db = new sqlite3.Database("./database.db");

const worker = new Worker(
  "agentquuuueee",
  async job => {
    const { agentId } = job.data;

    console.log("Provisioning agent:", agentId);

    exec(
      `docker run -d --name agent_${agentId} -p 0:3001 mini-agent`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }

        db.run(
          "UPDATE agents SET status = ? WHERE id = ?",
          ["running", agentId]
        );

        console.log("Agent running:", agentId);
      }
    );
  },
  { connection }
);