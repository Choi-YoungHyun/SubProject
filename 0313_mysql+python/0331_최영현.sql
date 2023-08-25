create  database if not exists kdt;
use kdt;



select * from kdt.student; #정보 테이블 확인용
select * from kdt.grade; 	#점수 테이블 확인용
select * from kdt.vw;		#view 테이블 확인용 (점수가 들어있는 사람만 담은)
select * from kdt.vw_left;  #점수가 들어있지않아도, None 값으로 합친 view
