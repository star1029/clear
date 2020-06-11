//扫雷区域
let x_main = document.getElementById("contain-main");
// 遮罩层
let x_shade = document.getElementById("contain-shade");
//选择难度
let x_select = document.getElementById("Top-select");
//开始按钮
let x_begin = document.getElementById("begin");
//计时器
let x_time = document.getElementById("time");
//雷个数
let x_num = document.getElementById("num");
let x_total = 36,
	x_around_num = Math.sqrt(x_total);
x_num.innerHTML = 6;
x_time.innerHTML = 00;

// 定义雷区位置
let raySite = (total, number)=>{
	let arr = [];
	for(let i = 0; arr.length < number; i++){
		let ranNum = Math.floor( Math.random()*total );
		if(arr.indexOf(ranNum) < 0){
			arr.push(ranNum);
		};
	};
	return arr
};
// 扫雷方块渲染
let setNode = (number)=> {
	x_main.innerHTML = ' ';
	let main_width = x_main.getBoundingClientRect().width,
		main_height = x_main.getBoundingClientRect().height,
		node_width = main_width/number + 'px',
		node_height = main_height/number + 'px',
		rayArr = raySite(x_total, x_num.innerHTML);

	for(let i = 0; i < x_total; i++){
		let x_node = document.createElement('span');
		if(rayArr.indexOf(i) > -1){
			x_node.className = 'contain_node ray_node';
		}else{
			x_node.className = 'contain_node';
		};
		x_node.style.width = node_width;
		x_node.style.height = node_height;
		x_node.style.lineHeight = node_height;
		x_node.dataset.index = i;
		x_main.appendChild(x_node);
	};
	// 点击事件
	x_main.addEventListener('click', e=>{
		if(e.target.nodeName.toLowerCase() === 'span'){
			if(!e.target.classList.contains('ray_node')){
				let index = Number(e.target.dataset.index),
						list = x_main.getElementsByTagName("span"),
						arr = [],
						num = 0;
				e.target.className = "contain_node flip";
				//左上
				if(index == 0){
					arr = [1, x_around_num, x_around_num+1];
				};
				//右上
				if(index == x_around_num - 1){
					arr = [index - 1, index - 1 + x_around_num, x_around_num*2 - 1];
				};
				//左下
				if(index == x_total - x_around_num){
					arr = [index - x_around_num, index - x_around_num + 1, x_total - x_around_num + 1];
				};
				//右下
				if(index == x_total - 1){
					arr = [index - 1 - x_around_num,index - x_around_num,index - 1];
				};
				//上方
				if(index > 0 && index < x_around_num){
					arr = [index - 1, index - 1 + x_around_num, index + x_around_num, 1 + index + x_around_num , 1 + index];
				};
				//右方
				if(index > x_around_num && index < x_total - 1 && (index + 1)%x_around_num == 0){
					arr = [index - 1 - x_around_num, index - x_around_num, index - 1, index - 1 + x_around_num, index + x_around_num];
				};
				//下方
				if(index > x_total - x_around_num && index < x_total - 1){
					arr = [index - 1, index - 1 - x_around_num, index - x_around_num, index + 1 - x_around_num, index + 1];
				};
				//左方
				if(index > 0 && index < x_total - x_around_num && index%x_around_num == 0){
					arr = [index - x_around_num, index - x_around_num + 1, index + 1, index + x_around_num, index + x_around_num + 1];
				};
				arr.forEach(item=>{
					console.log(list[item])
					if(list[item].classList.contains('ray_node')){
						num++;
					}else{
						list[item].className = "contain_node flip";
					}
				});
				list[index].innerHTML = num == 0 ? '' : num;
			}else{
				console.log('失败了！');
			};
		}
	});
	
};
// 初始渲染
setNode(x_num.innerHTML);
// 切换扫雷难度
x_select.onchange = () => {
	let val = x_select.options[x_select.selectedIndex].value;
	if(val == 'easy'){ x_total = 36; x_around_num = Math.sqrt(x_total); x_num.innerHTML = 6; }
		else if(val == 'medium'){ x_total = 81; x_around_num = Math.sqrt(x_total); x_num.innerHTML = 9; }
			else { x_total = 144; x_around_num = Math.sqrt(x_total); x_num.innerHTML = 12; }
	setNode(x_num.innerHTML);
};
// 计时
let timeActive = ()=>{
	timeStart = setInterval(()=>{ 
		if(x_time.innerHTML >= 999){
			timeEnd();
		}else{
			x_time.innerHTML = Number(x_time.innerHTML) + 1 ;
		}
	},1000);
}
let timeEnd = ()=>{clearInterval( timeStart )};
x_begin.onclick = () => {
	if(x_begin.classList.contains("begin")){
		x_begin.className = "";
		x_shade.className = "contain-shade";
		x_begin.innerHTML = "开始";
		timeEnd();
		x_time.innerHTML = 0;
		x_select.removeAttribute("disabled");
	}else{
		x_begin.className = "begin";
		x_shade.className = "contain-shade hide";
		x_begin.innerHTML = "结束此关";
		timeActive();
		x_select.setAttribute("disabled","disabled");
	};
};