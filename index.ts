import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
const port = 3000;
const app = express();
const yellowDelimiter = '\x1b[33m----------------------------------------\x1b[0m';

app.use(bodyParser.raw({ type: '*/*' }));

const logRequest = (req: Request, res: Response) => {

    const currentDatetime = new Date().toISOString();

    console.log(`\x1b[34m${currentDatetime}\x1b[0m`);
    console.log();

    console.log(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}`);
    for (const [key, value] of Object.entries(req.headers)) {
        console.log(`${key}: ${value}`);
    }
    console.log();

    const contentType = req.headers['content-type'];
    if (req.body && req.body.length > 0) {
        if (contentType && contentType.includes('application/json')) {
            console.log(JSON.stringify(JSON.parse(req.body.toString()), null, 2));
        } else {
            console.log(req.body.toString());
        }
    }
    console.log(yellowDelimiter);
    res.status(204).send();
};

app.all('*', (req: Request, res: Response) => {
    logRequest(req, res);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(yellowDelimiter);
});
