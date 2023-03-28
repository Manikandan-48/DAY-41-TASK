const { ObjectId } = require("mongodb");
const mongo = require("../connect");


//TO GET MENTORS:

module.exports.getAllMentors = async (req, res) => {
  try {
    const getResponse = await mongo.selectedDb
      .collection("mentors")
      .find()
      .toArray();
    res.send(getResponse);
  }
   catch {
    res.send({
      statusCode: 500,
      message: "Internal server error🚫",
    });
  }
};



//TO CREATE MENTOR:

module.exports.createMentor = async (req, res) => {
  try {
    const existUser =
      (await mongo.selectedDb
        .collection("mentors")
        .find({
          $and: [

            { mentorId: req.body.mentorId },
            { mentorName: req.body.mentorName },
            { contacts: req.body.contacts },
          ],
        })

        .count()) > 0;
    if (existUser) {
      res.send("Mentor exist already❗");
    } 
    else {
      await mongo.selectedDb.collection("mentors").insertOne(req.body);
      res.send({

        statusCode: 201,
        message: "Mentor is added Successfully👍",
      });
    }
  } 
  catch {
    res.send({
      statusCode: 500,
      message: "Internal server error🚫",
    });
  }
};




//TO SELECT ONE MENTOR AND MULTIPLE STUDENTS:

module.exports.assignStudentsToMentor = async (req, res) => {
  try {
    let id = req.params.id;
    await mongo.selectedDb
      .collection("mentors")
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { studentId: req.body.studentId } }
      );
    res.send({
      statusCode: 200,
      message: "Students are successfully assigned👍",
    });
  } catch {
    res.send({
      statusCode: 500,
      message: "Internal server error🚫",
    });
  }
};




//TO SHOW NUMBER OF STUDENTS FOR A PARTICULAR MENTOR USING AN API:

module.exports.showAllAssignedStudents = async (req, res) => {
  try {
    let id = req.params.id;
    const getAllmentorStudents = await mongo.selectedDb
      .collection("mentors")
      .aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            from: "students",
            localField: "studentId",
            foreignField: "studentId",
            as: "Mentors_Students",
          },
        },
        {
          $project: {
            mentorId: 1,
            mentorName: 1,
            experience: 1,
            contacts: 1,
            "Mentors_Students._id": 1,
            "Mentors_Students.studentId": 1,
            "Mentors_Students.studentName": 1,
            "Mentors_Students.email": 1,
            "Mentors_Students.experience": 1,
          },
        },
      ])
      .toArray();
    res.send(getAllmentorStudents);
  } catch {
    res.send({
      statusCode: 500,
      message: "Internal server error🚫",
    });
  }
};
