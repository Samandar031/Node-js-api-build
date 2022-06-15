const express = require('express');
const app = express();
const fs = require('fs');
const { get } = require('http');

const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);

app.use(express.json());

const getTour = (req, res) => {
  res.status(200).json({
    status: 'succes',
    data: 'siz datani oldingiz',
  });
};

const postTour = (req, res) => {
  res.status(200).json({
    status: 'succes',
    data: 'siz datani oldingiz',
  });
};

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'succes',
    data: tours,
  });
});

app.post('/api/v1/tours', (req, res) => {
  const data = req.body;
  const newId = tours[tours.length - 1].id + 1;
  data.id = newId;
  tours.push(data);
  fs.writeFileSync(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => console.log(err)
  );
  res.status(201).json({
    data: tours,
  });
  console.log(data);
});

////////////////////

const getTourById = (req, res) => {
  const id = req.params.id;
  const data = tours.find((val) => {
    return val.id == id;
  });
  console.log(data);
  if (data) {
    res.status(200).json({
      status: 'Succces',
      data: data,
    });
  }
};

const updateTour = (req, res) => {
  const id = req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      message: 'Bunday id topilmadi',
    });
  }
  res.status(200).json({
    status: 'Succes',
    message: 'The data has updated',
  });
};
const deleteTour = (req, res) => {
  const id = req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      message: 'Bunday id topilmadi',
    });
  }
  res.status(200).json({
    status: 'Succes',
    message: 'The data has deleted',
  });
};

app.route('/api/v1/tours').get(getTour).post(postTour);
app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .post(updateTour)
  .delete(deleteTour);

// /////////////////

app.listen(8000, () => {
  console.log('server is running');
});
