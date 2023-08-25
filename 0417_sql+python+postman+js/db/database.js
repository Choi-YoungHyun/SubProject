import SQ from 'sequelize'

const host = 'localhost'
const user = 'root'
const database = 'student'
const password ='1234'

export const sequelize = new SQ.Sequelize(database,user,password,{
    host,
    dialect:'mysql',
    logging:false,
    timezone:"Asia/Tokyo"
})


//mysql과 연결하기 위한 database.js 
//timezone으로 한국 시차 적용 (추후 timestamps 사용을 위해)
//.env는 git에 push하기 힘들기 때문에 사용하지 않음