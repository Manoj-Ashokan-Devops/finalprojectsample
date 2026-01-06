const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Node.js DevOps Pipeline without K8s & Terraform 🚀');
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
