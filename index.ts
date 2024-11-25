import express, {Request, Response } from 'express';


import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// middleware to parse json bodies
app.use(express.json());

// helper function for checking if two numbers sum to the target
function hasTargetSum(array: number[], target: number): boolean {
  const seen = new Set<number>();
  for (let num of array) {
    if (seen.has(target - num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}

// define a type for the expected request body
interface ArrayRequestBody {
  array: number[];
  ascending?: boolean;  // Used in /sort endpoint
  target?: number;      // Used in /target endpoint
}

// /add endpoint
app.get('/add', (req: Request, res: Response) => {
  const { array }: ArrayRequestBody = req.body;
  if (!Array.isArray(array) || array.some(isNaN)) {
    return res.status(400).send('Invalid input: array must be an array of numbers');
  }
  const sum = array.reduce((acc, num) => acc + num, 0);
  res.json({ sum });
});

// /product endpoint
app.get('/product', (req: Request, res: Response) => {
  const { array }: ArrayRequestBody = req.body;
  if (!Array.isArray(array) || array.some(isNaN)) {
    return res.status(400).send('Invalid input: array must be an array of numbers');
  }
  const product = array.reduce((acc, num) => acc * num, 1);
  res.json({ product });
});

// evens endpoint
app.get('/evens', (req: Request, res: Response) => {
  const { array }: ArrayRequestBody = req.body;
  if (!Array.isArray(array) || array.some(isNaN)) {
    return res.status(400).send('Invalid input: array must be an array of numbers');
  }
  const evens = array.filter(num => num % 2 === 0);
  res.json({ evens });
});

// min endpoint
app.get('/min', (req: Request, res: Response) => {
  const { array }: ArrayRequestBody = req.body;
  if (!Array.isArray(array) || array.some(isNaN)) {
    return res.status(400).send('Invalid input: array must be an array of numbers');
  }
  const min = Math.min(...array);
  res.json({ min });
});

// max endpoint
app.get('/max', (req, res) => {
  const { array }: ArrayRequestBody = req.body;
  if (!Array.isArray(array) || array.some(isNaN)) {
    return res.status(400).send('Invalid input: array must be an array of numbers');
  }
  const max = Math.max(...array);
  res.json({ max });
});

// sort endpoint
app.get('/sort', (req: Request, res: Response) => {
  const { array, ascending }: ArrayRequestBody = req.body;
  if (!Array.isArray(array) || array.some(isNaN) || typeof ascending !== 'boolean') {
    return res.status(400).send('Invalid input: array must be an array of numbers and ascending must be a boolean');
  }
  const sorted = [...array].sort((a, b) => ascending ? a - b : b - a);
  res.json({ sorted });
});

// target endpoint
app.get('/target', (req: Request, res: Response) => {
  const { array, target }: ArrayRequestBody = req.body;
  if (!Array.isArray(array) || array.some(isNaN) || typeof target !== 'number') {
    return res.status(400).send('Invalid input: array must be an array of numbers and target must be a number');
  }
  const result = hasTargetSum(array, target);
  res.json({ targetFound: result });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

