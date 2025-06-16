import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

let teaData = [];
let nextId = 1;
app.use(express.json());

// POST /teas - Create add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all teas
// GET /teas - Retrieve all teas
// GET /teas/:id - Retrieve a specific tea by ID
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get tea by id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

app.get("/", (req, res) => {
  res.status(200).send("hello from express");
});

//update tea by id

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});
// DELETE /teas/:id - Delete a specific tea by ID
app.delete("/teas/:id", (req, res) => {
  const teaIndex = teaData.findIndex(
    (tea) => tea.id === parseInt(req.params.id)
  );
  if (teaIndex === -1) {
    return res.status(404).send("Tea not found");
  }
  const deletedTea = teaData.splice(teaIndex, 1);
  res.status(204).send(deletedTea[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
