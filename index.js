//扫雷区域
let x_main = document.getElementById("contain-main");
//选择难度
let x_select = document.getElementById("Top-select");
//开始按钮
let x_begin = document.getElementById("begin");
//计时器
let x_time = document.getElementById("time");
//雷个数
let x_num = document.getElementById("num");
let x_total = 36;
x_num.innerHTML = 6;
x_time.innerHTML = 00;

let setNode = (number)=> {
	x_main.innerHTML = ' ';
	let main_width = x_main.getBoundingClientRect().width,
		main_height = x_main.getBoundingClientRect().height,
		node_width = main_width/number + 'px',
		node_height = main_height/number + 'px';

	for(let i = 0; i < x_total; i++){
		let x_node = document.createElement('span');
		x_node.className = 'contain_node';
		x_node.style.width = node_width;
		x_node.style.height = node_height;
		x_main.appendChild(x_node);
	};
};

setNode(x_num.innerHTML);

x_select.onchange = () => {
	let val = x_select.options[x_select.selectedIndex].value;
	if(val == 'easy'){ x_total = 36; x_num.innerHTML = 6; }
		else if(val == 'medium'){ x_total = 81; x_num.innerHTML = 9; }
			else { x_total = 144; x_num.innerHTML = 12; }
	setNode(x_num.innerHTML);
}

x_begin.onclick = () => {
	let timeBegin = setInterval(()=>{ 
		if(x_time.innerHTML >= 999){
			timeEnd();
		}else{
			x_time.innerHTML = Number(x_time.innerHTML) + 1 ;
		}
	},1000);

	let timeEnd = ()=>{clearInterval( timeBegin )};
};