import express from 'express'
import cors from 'cors'
import ScoreRouter from './router/score.js'
import StudentRouter from './router/student.js'
import { sequelize } from './db/database.js'

//서버 open
const app = express();
app.use(express.json());
// 보안오류를 대비해 cors 사용
app.use(cors());

// 학생테이블과, 점수테이블 라우터 구분 
app.use("/student", StudentRouter);
app.use("/score", ScoreRouter);

// localhost:9090으로 설정
app.listen(9090)

// mysql 동기화를 통해 즉시 업데이트 
sequelize.sync()