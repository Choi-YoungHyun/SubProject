import express from 'express';
import { insert } from '../controller/score.js';

const router = express.Router()
const app = express()
// postman에서 json 형식을 받기 위한 준비
app.use(express.json())


router.get('/')

// 점수 테이블 데이터 추가를 위한 라우터 
router.post('/insert',insert);


export default router