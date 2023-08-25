import * as userRepository from '../data/student.js';


//학생정보 (user 테이블) 입력을 위한 함수 
export async function signup(req, res){
    //postmen의 body에서 json 형태로 받을 예정 
    const { studentId, name, hp,email, address } = req.body
    const SignUp = await userRepository.createUser({
        studentId,
        name,
        hp,
        email,
        address
    })
    //포스트맨에 실행 결과 출력 
    res.status(201).json({message: '학생테이블(user) 등록 완료'})
}


// 전체 데이터 조회를 위한 함수 
export async function getInfo(req,res){
    const data = await userRepository.getAll()

    //포스트맨에 실행 결과 출력 
    res.status(200).json(data);
}

// 5. 학번으로 검색한다. (10점)
// 조건: postmen URl의 localhost:9090/student/학번 
export async function SearchInfo(req,res){

    // 포스트맨 URL에서 찾고자하는 학생의 학번 입력받음
    const temp_studentid = req.params.id;
    const data = await userRepository.getById(temp_studentid)

    //포스트맨에 실행 결과 출력 
    res.status(200).json(data);
}


//삭제 (같은 학번을 가지고 있는 테이블)
//postmen URL은 localhost:9090/student/학번 
export async function deleteInfo(req,res,next){

    // 포스트맨 URL에서 찾고자하는 학생의 학번 입력받음
    const temp_studentid = req.params.id;
    //학번을 기준으로 부합하는 데이터 객체를 가져옴(점수 포함)
    const search_data = await userRepository.getById(temp_studentid);
    
    //user 테이블의 학번에 부합하는 pk키를 변수에 저장 
    const search_id = await userRepository.findByUsername(temp_studentid)
    
    // 데이터 객체가 없을 시 오류처리
    if(!search_data){
        res.status(404).json({message:`(${search_data})가 null 이거나 없습니다.` })        
    }
    //user 테이블 삭제를 위한 함수
    await userRepository.remove(temp_studentid);

    //score 테이블 삭제를 위한 함수
    await userRepository.remove2(search_id)
    res.status(204).json({message: "학생정보 삭제 완료"});
}




// 학생정보 및 점수 수정
export async function updateInfo(req, res,next){
    const temp_studentid = req.params.id;
    
    //postmen body에서 json 형태로 점수테이블,학생테이블의 필드에 맞는 값을 받기 위한 설정
    const {studentId,name,hp,email,address,java,python,cLanguage} = req.body;

    //user 테이블의 학번에 부합하는 pk키를 변수에 저장 
    const search_id = await userRepository.findByUsername(temp_studentid)
    
    // 하단 변수에 객체가 들어가야해서 빈 객체 형성
    // 객체의 key,value값이 무엇이 들어올지 모르기때문에 설정
    const updatedData = {};
    if(studentId){
        updatedData.studentId = studentId
    }
    if (name) {
    updatedData.name = name;
    }
    if (hp) {
    updatedData.hp = hp;
    }
    if (email) {
    updatedData.email = email;
    }
    if (address) {
    updatedData.address = address;

    }if(java){
        updatedData.java = java
        updatedData.total =python+cLanguage+java
        updatedData.avg = (python+cLanguage+java)/3
    }if (python) {
    updatedData.python = python;
    updatedData.total =python+cLanguage+java
    updatedData.avg = (python+cLanguage+java)/3
    }if (cLanguage) {
    updatedData.cLanguage = cLanguage;
    updatedData.total =python+cLanguage+java
    updatedData.avg = (python+cLanguage+java)/3
    }
    // 점수는 avg, total에도 영향을 줘야함으로 재 설정

    //학생 테이블에 수정 사항 적용
    const updated = await userRepository.updateUser(updatedData,temp_studentid);

    //점수 테이블에 수정 사항 적용
    const update2 = await userRepository.updateScore(updatedData,search_id)

    //실행 결과를 2가지 테이블 동시 출력 (update는 학생 테이블)
    res.status(200).json({updated,update2})

}