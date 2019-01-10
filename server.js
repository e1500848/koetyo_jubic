const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  fs.readFile('./data.json', 'utf8', function read(err, data){
    if (err) {
      throw err;
    }
    res.send({ express: JSON.parse(data) });
  });
});


app.post('/api/world', (req, res) => {
  fs.readFile('./data.json', 'utf8', function read(err, data){
    if (err) {
      throw err;
    }
    // Removes the ] from the and adds , to the end so it's viable after adding ] again at the end
    data = data.replace("]","");
    data = data.concat(",");
    console.log("orig"+data);
    var newData = data.concat(JSON.stringify(req.body.post));
    console.log(newData);
    newData = newData.concat("]")

    fs.writeFile('./data.json', newData, function(err){
      if(err) throw err;
      console.log('saved');
    });

    res.send({express: JSON.parse(newData) });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
