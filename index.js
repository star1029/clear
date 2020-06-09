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
		x_main.appendChild(x_node);
	};
	// 点击事件
	x_main.addEventListener('click', e=>{
		if(e.target.nodeName.toLowerCase() === 'span'){
			if(!e.target.classList.contains('ray_node')){
				
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
	if(val == 'easy'){ x_total = 36; x_num.innerHTML = 6; }
		else if(val == 'medium'){ x_total = 81; x_num.innerHTML = 9; }
			else { x_total = 144; x_num.innerHTML = 12; }
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
	}else{
		x_begin.className = "begin";
		x_shade.className = "contain-shade hide";
		x_begin.innerHTML = "结束此关";
		timeActive();
	};
};