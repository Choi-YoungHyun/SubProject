import SQ from 'sequelize'
import { sequelize } from '../db/database.js';
import { Score } from './score.js';

//자주 테이블 형성시 사용하는 데이터 타입을 변수 처리 
const DataTypes = SQ.DataTypes

// User 테이블 형성 
// 조건: 학생 테이블 필드 : 일렬번호(자동증가), 학번(문자열), 이름(문자열), 연락처(문자열), 이메일, 주소(문자열), 등록된 날짜(날짜)
export const User = sequelize.define(
    'user',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        studentId:{
            type:DataTypes.STRING(45),
            allowNull:false,
            unique:true
        },
        name:{
            type:DataTypes.STRING(45),
            allowNull: false,
        },
        hp:{
            type:DataTypes.STRING(45),
            allowNull: false,
        },
        email:{
            type:DataTypes.STRING(128)
        },
        address:{
            type:DataTypes.STRING(128)
        }
    },
    {timestamps: true}
)

//join 시킴
// Score.belongsTo(User, {foreignKey:'id',foreignKeyConstraints: false});
User.hasOne(Score,{foreignKey:'id'})
Score.belongsTo(User,{foreignKey:'id'})

//User 테이블과 Score 테이블의 내용을 같이 출력하기 위한 변수 설정 
//sequelize.literal를 통해 rank 함수를 사용하여 점수가 있을 시 avg 기준으로 내림차순 정렬 
// 대괄호는 postman에 출력시 한글로 변환하여 보기 편하기 위해 사용
const INCLUDE_SCORE = {
    attributes: [
        ['id','일련번호'],
        ['studentId','학번'],
        ['name','이름'],
        [sequelize.col('score.java'), '자바'],
        [sequelize.col('score.python'), '파이썬'],
        [sequelize.col('score.cLanguage'), 'c언어'],
        [sequelize.col('score.total'), '총점'],
        [sequelize.col('score.avg'), '평균'],
        [sequelize.literal('RANK() OVER (ORDER BY score.avg DESC)'), 'rank']
    ],
    include: {
        model: Score,
        attributes: []
    }
}


//학생 정보 + 점수 전체 조회하는 것 (전체 검색)
export async function getAll() {
    return User.findAll({ ...INCLUDE_SCORE},)
}

//학생 정보 + 점수 전체 조회하는 것 (조건 검색)
export async function getById(studentId) {
    return User.findOne({
        where: {studentId}, ...INCLUDE_SCORE
    })
}


//점수 입력할 때 학번 입력시 자동으로 일련번호 입력 
export async function findByUsername(studentId){
    return User.findOne({where:{studentId}}).then((data)=>data.dataValues.id)
}

// 학생 정보 최초입력하는 것 
export async function createUser(user){
    return User.create(user).then((data)=>data.dataValues.id)
}


// User 테이블(학생정보) 수정 
//(controller -> student.js의 updateInfo 사용  예정)
export async function updateUser(updatedData,studentId) {
    const user = await User.findOne({ where: {studentId} });

    //findone에서 반환되는 객체가 없을시 대비한 오류처리
    if (!user) {
        throw new Error(`수정할 데이터를 찾지 못했습니다. user 확인 바람`);
    }
    await user.update(updatedData);
    return user;
}


//Score테이블 수정
//현재 data 폴더안에 student와 score가 있는데 
//양쪽에서 import 시켜서 사용할 시 : set header오류(응답 후 데이터 설정이 불가)한 오류가 발생
//따라서 student.js에서 한쪽에서 수정,삭제를 하려고 만듬

//(controller -> student.js의 updateInfo 사용  예정)
export async function updateScore(updatedData,id){
    const search_score = await Score.findOne({where: {id}})

    //findone에서 반환되는 객체가 없을시 대비한 오류처리
    if (!search_score) {
        throw new Error(`수정할 데이터를 찾지 못했습니다. Score 테이블 확인 바람`);
    }
    await search_score.update(updatedData);
    return search_score;
}


// User 테이블(학생정보) 삭제
//현재 data 폴더안에 student와 score가 있는데 
//양쪽에서 import 시켜서 사용할 시 : set header오류(응답 후 데이터 설정이 불가)한 오류가 발생
//따라서 student.js에서 한쪽에서 수정,삭제를 하려고 만듬

//(controller -> student.js의 deleteInfo 사용  예정)
export async function remove(studentId) {
    return User.findOne({where: {studentId}}) //학번을 받아와서 삭제
    .then((delete_obj) => {
        if(!delete_obj){
            throw new Error(`삭제할 데이터를 찾지 못했습니다. delete_obj 확인 바람`);
        }
        delete_obj.destroy()
    })
}

// Score 테이블(학생정보) 삭제
//(controller -> student.js의 deleteInfo 사용  예정)
export async function remove2(id) {
    return Score.findOne({where: {id}}) //score 테이블에 학번이 없기 때문에 id로 사용
    .then((delete_obj) => delete_obj.destroy())
}




