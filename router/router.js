const express=require('express');
const router=express.Router();

const mentorModule=require('../modules/mentorModule')
const studentModule=require('../modules/studentModule')

router.post('/create-mentor',mentorModule.createMentor)
router.post('/create-student',studentModule.createStudent)

router.put('/assign-mentor/:id',mentorModule.assignStudentsToMentor)
router.put('/assign-student/:id',studentModule.assignMentorToStudent)

router.get('/mentor-students/:id',mentorModule.showAllAssignedStudents)
router.get('/mentors',mentorModule.getAllMentors)

router.get('/students',studentModule.getAllStudents)

module.exports=router;     