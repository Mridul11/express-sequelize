import express from 'express';
import cors from 'cors';
import os from 'os';
import cluster from 'cluster';
const usersRouter = require('./routes/usersRouter');
const rolesRouter = require('./routes/rolesRouter');
const postsRouter = require('./routes/postsRouter');
const cpuCount = os.cpus().length;

if(cluster.isMaster){
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
}else{
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/api-v1', usersRouter);
    app.use('/api-v1', rolesRouter);
    app.use('/api-v1', postsRouter);

    app.listen(8080, () => console.log(`Worker ${process.pid} started`));
}