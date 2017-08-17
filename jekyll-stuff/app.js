const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

app.listen(port, () =>{
  console.log(`Server has started on port ${port}`);
});
