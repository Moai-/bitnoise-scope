import path from 'path';
import express from 'express';
import cors from 'cors';

const setupApp = () => {
    const app = express();
    const frontendDir = path.resolve(__dirname, '../../../frontend/build');
    app.use(express.static(frontendDir));
    app.use(cors());
    app.get("/", (req, res) => {
        res.sendFile(path.join(frontendDir, "index.html"));
    });
    return app;
}

export default setupApp;