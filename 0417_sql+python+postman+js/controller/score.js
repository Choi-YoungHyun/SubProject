import * as scoreRepository from '../data/score.js';
import * as userRepository from '../data/student.js'


//Score 테이블 정보 입력을 위한 함수
export async function insert(req, res){

    //postmen body에서 json 타입으로 키값에 맞는 값을 받을 예정
    const { studentId, java, python, cLanguage } = req.body
    const temp_sum = java+python+cLanguage
    const temp_avg = parseInt((java+python+cLanguage)/3)

    //점수 입력할 때 학번 입력시 자동으로  일련번호에 들어갈 수 있게 변수 설정
    const search_id = await userRepository.findByUsername(studentId)
    
    // score 테이블의 데이터 추가
    const Insert = await scoreRepository.createScore({
        id:search_id,
        java,
        python,
        cLanguage,
        total: temp_sum,
        avg:temp_avg
    })
    //실행결과를 postmen의 출력 (메세지로만)
    res.status(201).json({message: '점수테이블(scores) 등록 완료'})
} 

