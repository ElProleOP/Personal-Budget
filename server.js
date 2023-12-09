const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/envelopes', require('./routes/envelopes'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});