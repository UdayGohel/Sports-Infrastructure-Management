const { default: mongoose } = require("mongoose");
const SportsComplex = require("../Model/SportsComplexModel");
const sportModel = require("../Model/SportModel");
// const SportsComplexModel = require("../Model/SportsComplexModel");
const instructerModel = require("../Model/instructorModel");
const paymentModel = require("../Model/PaymentModel");
const complaintModel = require("../Model/ComplaintModel");
const session = require("../Model/SessionModel");
const { response } = require("express");
const { ip } = require("../config/ip");

module.exports.AddSportsComplex = async function (req, res) {
  const BaseUrl = `/SportComplexes/${req.file.originalname}`;
  console.log(BaseUrl);
  // req.body.baseUrl = BaseUrl;

  let SportComplex = new SportsComplex({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    location: req.body.location,
    district: req.body.district,
    // sports: [],
    taluka: req.body.taluka,
    area: req.body.area,
    operationalSince: req.body.operationalSince,
    picture: BaseUrl,
  });

  let data = await SportComplex.save();
  res.json({ data: data, msg: "SportComplex Added", rcode: 200 });
};

module.exports.getSportsComplex = async function (req, res) {
  //req.query {manager: id}
  let data = await SportsComplex.find(req.query);
  if (data) {
    res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.getSportsComplexwithdistrict = async function (req, res) {
  //req.query {manager: id}
  let data = await SportsComplex.find(req.query).populate("district");
  if (data) {
    res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.getSportsComplexwithmanager = async function (req, res) {
  //req.query {manager: id}
  let data = await SportsComplex.find(req.query).populate("manager");
  if (data) {
    res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.getSportsComplexwithmanagerwithdistrict = async function (
  req,
  res
) {
  let data = await SportsComplex.find(req.query)
    .populate("manager")
    .populate("district");
  if (data) {
    res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.getSportsComplexwithSportName = async function (req, res) {
  //req.query {manager: id}
  let data = await SportsComplex.find(req.query).populate("sports.sport");
  if (data) {
    res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.updateSportsComplex = async function (req, res) {
  const id = req.params.id;

  console.log(req.files);
  let resourcesarray = [];
  req.files.forEach((ele) => {
    resourcesarray.push(`${ip}/uploads/${ele.originalname}`);
  });

  let json = {
    sport: req.body.sport, // Replace with the actual sport ID
    images: resourcesarray,
    rating: req.body.rating,
    fees: req.body.fees,
    capacity: req.body.capacity,
  };

  let sportcomplex = await SportsComplex.findOne({ _id: id });
  sportcomplex.sports.push(json);
  let response = await sportcomplex.save();
  res.json({ data: response, msg: "updated successfully", rcode: 200 });
};

function haversineDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  const radLat1 = (Math.PI * lat1) / 180;
  const radLon1 = (Math.PI * lon1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const radLon2 = (Math.PI * lon2) / 180;

  // Haversine formula
  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

module.exports.SearchComplex = async function (req, res) {
  try {
    const query = req.query.q;
    var data = [];
    if (!query) {
      let data1 = await SportsComplex.find().populate("district");

      if (req.query.distance) {
        const { distance, lat, lon } = req.query;

        const complex = data1.filter((element) => {
          const distanceCheck = haversineDistance(
            element.latitude,
            element.longitude,
            lat,
            lon
          );
          return distanceCheck <= distance;
        });

        return res.json({
          result: complex.length,
          data: complex,
          rcode: 200,
        });
      }

      res.status(200).json({
        results: data1.length,
        data: data1,
        status: "Success",
        // data: data,ś
      });
    }

    data = await SportsComplex.aggregate([
      {
        $lookup: {
          from: "districts", // Replace with the actual name of your "districts" collection
          localField: "district",
          foreignField: "_id",
          as: "districtInfo",
        },
      },
      {
        $lookup: {
          from: "sports", // Replace with the actual name of your "Sports" collection
          localField: "sports.sport",
          foreignField: "_id",
          as: "sportsInfo",
        },
      },
      {
        $match: {
          $or: [
            { name: { $regex: `^${query}`, $options: "i" } },
            { "districtInfo.District": { $regex: `^${query}`, $options: "i" } },
            { "sportsInfo.SportName": { $regex: `^${query}`, $options: "i" } },
          ],
        },
      },
    ]);

    if (req.query.distance) {
      const { distance, lat, lon } = req.query;

      const complex = data.filter((element) => {
        const distanceCheck = haversineDistance(
          element.latitude,
          element.longitude,
          lat,
          lon
        );
        return distanceCheck <= distance;
      });

      return res.json({
        result: complex.length,
        data: complex,
        rcode: 200,
      });
    }

    res.json({
      result: data.length,
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    // res.json({
    //   error: err.msg,
    //   rcode: -9,
    // });
  }
};

module.exports.sportsComplexOfSport = async function (req, res) {
  try {
    // let Complex = await SportsComplex.find({
    //   "sports.sport": req.query.sportId,
    // });
    // res.json({
    //   data: Complex,
    //   rcode: 200,
    // });\

    const query = req.query.q;
    var data = [];
    if (!query) {
      let data1 = await SportsComplex.find({
        "sports.sport": req.query.sportId,
      }).populate("district");

      if (req.query.distance) {
        const { distance, lat, lon } = req.query;

        const complex = data1.filter((element) => {
          const distanceCheck = haversineDistance(
            element.latitude,
            element.longitude,
            lat,
            lon
          );
          return distanceCheck <= distance;
        });

        return res.json({
          result: complex.length,
          data: complex,
          rcode: 200,
        });
      }

      return res.status(200).json({
        results: data1.length,
        data: data1,
        status: "Success",
        // data: data,ś
      });
    }

    data = await SportsComplex.aggregate([
      {
        $match: {
          "sports.sport": new mongoose.Types.ObjectId(req.query.sportId),
        },
      },
      {
        $lookup: {
          from: "districts", // Replace with the actual name of your "districts" collection
          localField: "district",
          foreignField: "_id",
          as: "districtInfo",
        },
      },
      // {
      //   $lookup: {
      //     from: "sports", // Replace with the actual name of your "Sports" collection
      //     localField: "sports.sport",
      //     foreignField: "_id",
      //     as: "sportsInfo",
      //   },
      // },
      {
        $match: {
          $or: [
            { name: { $regex: `^${query}`, $options: "i" } },
            { "districtInfo.District": { $regex: `^${query}`, $options: "i" } },
            // { "sportsInfo.SportName": { $regex: `^${query}`, $options: "i" } },
          ],
        },
      },
    ]);

    if (req.query.distance) {
      const { distance, lat, lon } = req.query;

      const complex = data.filter((element) => {
        const distanceCheck = haversineDistance(
          element.latitude,
          element.longitude,
          lat,
          lon
        );
        return distanceCheck <= distance;
      });

      return res.json({
        result: complex.length,
        data: complex,
        rcode: 200,
      });
    }

    return res.json({
      result: data.length,
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
};

module.exports.SportsComplexDetail = async function (req, res) {
  try {
    const instructerData = await instructerModel
      .find({
        SportComplexId: req.query.sportsComplex,
      })
      .populate("userId");
    console.log(instructerData);
    const insName = instructerData.map((doc) => doc.userId.Name);

    console.log("insname => " + insName);

    const SportsData = await SportsComplex.find({
      _id: req.query.sportsComplex,
    }).populate("sports.sport");

    // console.log(SportsData);
    // console.log(SportsData[0].sports[0].sport);

    // console.log("SportsData => "+SportsData);
    // console.log("SportData length => "+SportsData.length);
    // console.log("SportData's sport length =>" + SportsData.sports.length);

    // for (let i=0; i < SportsData.length; i++){
    //   console.log(SportsData[i].sports[i].sport.SportName)
    // }

    // let SportsNames = [];
    // for (let i=0; i < SportsData.length; i++) {
    //   const sportsName = SportsData.map(
    //     (item) => item.sports[i].sport.SportName
    //   );
    //   console.log(sportsName);
    //  SportsNames = SportsNames.concat(sportsName);

    // }
    // console.log("SportNames => "+SportsNames)

    const complaintcount = await complaintModel.find({
      $and: [
        { sportsComplex: req.query.sportsComplex },
        { level: 0 },
        { status: 0 },
      ],
    });

    //console.log(complaintcount.length);

    let SportsNames = [];

    //sportdata 1 j hoy every time
    for (let i = 0; i < SportsData.length; i++) {
      for (let j = 0; j < SportsData[i].sports.length; j++) {
        const sportsName = SportsData[i].sports[j].sport.SportName;
        SportsNames.push(sportsName);
      }
    }

    console.log("SportNames =>", SportsNames);

    const athleteCount = await paymentModel.aggregate([
      {
        $match: {
          sportsComplexId: new mongoose.Types.ObjectId(req.query.sportsComplex),
        },
      },
      {
        $group: {
          _id: "$athleteId",
          Paymentcount: { $sum: 1 },
        },
      },
      // {
      //   $project: {
      //     // Paymentcount: 1,
      //   },
      // },
    ]);

    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    const presentCount = await session.aggregate([
      {
        $match: {
          sportscomplex: new mongoose.Types.ObjectId(req.query.sportsComplex),
          date: {
            $gte: startOfDay,
            $lt: endOfDay,
          }, // Match date within the given day
        },
      },
      {
        $unwind: "$enrolls",
      },
      {
        $group: {
          _id: "$enrolls.userId",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(presentCount.length);

    res.json({
      athleteCount: athleteCount.length,
      athletePaymentCount: athleteCount,
      instructerData: insName,
      instructerCount: insName.length,
      ComplainCount: complaintcount,
      availableSports: SportsNames,
      presentCount: presentCount.length,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
  }
};
