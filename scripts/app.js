(function() {

  let $result = document.querySelector('#result');   // 获取 id="result" 的元素
  let $plus = document.querySelector('.keybtn.operator.plus');      // 获取 ‘加’ 号元素
  let $equal = document.querySelector('.keybtn.operator.equal');    // 获取 ‘等’ 号元素
  let $clear = document.querySelector('.keybtn.operator.clear');    // 获取 ‘清’ 键元素
  let $delete = document.querySelector('.keybtn.operator.delete')   // 获取 ‘删’ 键元素
  let $numbers = document.querySelectorAll('.keybtn.number');       // 获取所有数字键元素

  let expr = '0';    // 记录当前的计算表达式
  let operators = ['+', '-', 'x', '/'];   // 运算符
  
  // 通过函数 set 完成两个操作
  function set(value) {
    expr = String(value);       // 给 expr 赋新的值，通过 String() 保证 expr 是字符串
    $result.innerText = expr;   // 给 #result 元素设置新的文本 expr
  }

  set(expr);  // 初始化计算器显示结果为 0
  
  // 遍历数字键 DOM 元素，给每个数字键添加 click 事件监听器
  for (let i = 0; i < $numbers.length; i++) {
    $numbers[i].addEventListener('click', function(event) {
      // 点击数字键时运行这个函数内的代码
      // event.currentTarget 就是监听事件的元素，即数字键的 DOM 元素
      // 通过 getAttribute 方法获取被点击数字键的 data-number 属性，即其对应的罗马数字。
      let number = event.currentTarget.getAttribute('data-number');
      // 如果当前计算表达式为 '0'
      if (expr === '0') {
        set(number);  // 设置显示值为被点击的数字
      } else {
        set(expr + number);  // 否则在表达式后面加上被点击的数字并显示
      }
    });
  }

  // 给 ‘加’ 号添加 click 事件监听器
  $plus.addEventListener('click', function() {
    // 点击 ‘加’ 号时运行这个函数内的代码
    // 如果 expr 最后一个字符是运算符
    if (operators.indexOf(expr[expr.length - 1]) > -1) {
      // 那么把最后一个字符换成 '+'
      // expr.slice(0, expr.length - 1) 返回一个新字符串，包含原字符串的第一个到倒数第二个字符
      set(expr.slice(0, expr.length - 1) + '+');
    } else {
      // 否则直接在 expr 后面补上 '+' 并显示
      set(expr + '+');
    }
  });
  
  // 给 ‘清’ 键添加 click 事件监听器
  $clear.addEventListener('click', function() {
    // 点击 ‘清’ 键时显示结果 0
    set('0');
  });

  // 给 ‘删’ 键添加 click 事件监听器
  $delete.addEventListener('click', function() {
    // 点击 ‘删’ 键时，如果 expr 只有一个字符
    if (expr.length === 1) {
      set('0');   // 结果置 0
    } else {
      // 否则把最后一个字符去掉，并把调用 slice 返回的新字符(包含原字符串的第一个到倒数第二个字符)设置成结果
      set(expr.slice(0, -1));
    }
  });

  // 给 ‘等’ 键添加 click 事件监听器
  $equal.addEventListener('click', function() {
    // 如果当前计算表达式的最后一个字符是运算符
    if (operators.indexOf(expr[expr.length - 1]) > -1) {
      // expr.slice(0, -1) 返回一个新字符串，包含原字符串第一个字符到倒数第二个字符
      // 就是说不要最后那个运算符
      // eval() 可以用于求值，比如 eval('1 + 2') 返回 3
      // 通过 set() 把 eval() 求值的结果显示出来
      set(eval(expr.slice(0, -1)));
    } else {
      // 否者直接把表达式给 eval() 进行求值并显示
      set(eval(expr));
    }
  });

})();