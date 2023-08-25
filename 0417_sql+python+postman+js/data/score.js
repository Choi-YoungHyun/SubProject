import SQ from 'sequelize'
import { sequelize } from '../db/database.js';

//자주 테이블 형성시 사용하는 데이터 타입을 변수 처리 
const DataTypes = SQ.DataTypes

// Score 테이블 형성 
// 조건: 성적 테이블 필드 : 일렬번호(숫자), 자바점수(숫자), 파이썬점수(숫자), C언어점수(숫자), 등록된 날짜(날짜), 총점(숫자), 평균(숫자)

//User테이블에 학번으로 검색하여 해당 autoincrement가 된 id라는 pk키를 가지고 검색
export const Score = sequelize.define(
    'score',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 1,
            primaryKey:true
        },
        java:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        python:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        cLanguage:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        total:{
            type:DataTypes.INTEGER
        },
        avg:{
            type:DataTypes.INTEGER
        }
    },
    {timestamps: true}
)



// Score 테이블에 정보 입력하는 함수 
export async function createScore(score){
    return Score.create(score).then((data)=>data.dataValues)
}
//반환되는 값은 객체 


// Score 테이블에 정보를 삭제하는 함수 
//User테이블에 학번으로 검색하여 해당 autoincrement가 된 id라는 pk키를 가지고 검색
export async function removeScore(studentId) {
    const search_user = User.findOne({where:{studentId}})
    //user테이블의 조건에 맞는 pk와 같은 값을 가진 Score 테이블 필드를 찾기위한 함수
    .then((data)=>data.dataValues.id)

    return Score.findOne({where: {search_user}})
    .then((delete_obj) => {delete_obj.destroy()})
}


