import express from 'express';
import { signup, getInfo, SearchInfo,deleteInfo,updateInfo } from '../controller/student.js';

const router = express.Router()
const app = express()

// postman에서 json 형식을 받기 위한 준비
app.use(express.json())

router.get('/')

//학생정보 입력하는 라우터
router.post('/signup',signup);

//전체 학생 정보를 가져오는 라우터
router.get('/searchall', getInfo)

//학번에 부합하는 학생 정보를 가져오는 라우터
router.get('/:id',SearchInfo)

// 특정 학번에 부합하는 학생정보와 점수를 삭제하는 라우터
router.delete('/:id',deleteInfo)

// 특정 학번에 부합하는 학생정보와 점수를 수정하는 라우터
router.put ('/:id',updateInfo)

export default router