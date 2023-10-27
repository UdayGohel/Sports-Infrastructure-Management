const { default: mongoose } = require("mongoose");
const SportsComplex = require("../Model/SportsComplexModel");

module.exports.AddSportsComplex = async function (req, res) {
  let SportComplex = new SportsComplex({
    name: req.body.name,
    location: req.body.location,
    // district: { type: mongoose.SchemaTypes.ObjectId, ref: "districts" },
    // sports: [],
    taluka: req.body.taluka,
    area: req.body.area,
    operationalSince: req.body.operationalSince,
  });

  let data = await SportComplex.save();
  res.json({ data: data, msg: "SportComplex Added", rcode: 200 });
};

module.exports.getSportsComplex = async function (req, res) {
  SportsComplex.find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: 200 });
    });
};

module.exports.updateSportsComplex = async function (req, res) {
  const id = req.params.id;

  console.log(req.files);
  let resourcesarray = [];
  req.files.forEach((ele) => {
    resourcesarray.push(`http://localhost:9999/uploads/${ele.originalname}`);
  });

  console.log(resourcesarray);

  let json = {
    sport: req.body.sport, // Replace with the actual sport ID
    images: resourcesarray,
    rating: req.body.rating,
    fees: req.body.fees,
  };

  let sportcomplex = await SportsComplex.findOne({ _id: id });
  sportcomplex.sports.push(json);
  let response = await sportcomplex.save();
};
