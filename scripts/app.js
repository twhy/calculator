(function() {

  let calculator = {

    expr: '0',

    operators: ['+', '-', '*', '/'],

    NEGATIVE:  ' -',

    RESULT_CONTENT_MAX_WIDTH_PERCENTAGE: 1 - 0.07 * 2,

    init() {
      this.$el = document.querySelector('#calculator');
      this.$el.addEventListener('click', this, false);
      this.$result = this.$el.querySelector('#result');
      this.$expr = this.$el.querySelector('#expr');
      this.set(this.expr);
      this.onOrientationChange();
      window.addEventListener('orientationchange', this, false);
    },

    set(value) {
      // 处理浮点数不精确的情况如 0.1 + 0.2 = 0.30000000000000004
      if (typeof value === 'number') value = parseFloat(value.toPrecision(8));
      
      this.expr = String(value);
      this.$expr.innerText = this.expr;
      this._scale();
    },

    _scale() {
      let maxWidth = this.$result.clientWidth * this.RESULT_CONTENT_MAX_WIDTH_PERCENTAGE;
      if (this.$expr.scrollWidth > maxWidth) {
        this.$expr.style.transform = `scale(${1  / (this.$expr.scrollWidth / maxWidth)})`;
        this.$expr.style.transformOrigin = 'right center';
      } else {
        this.$expr.style.transform = `scale(1)`;
      }
    },

    isLandscape() {
      if (Math.abs(window.orientation) === 90) return true;
      if (screen.orientation &&
       (screen.orientation.angle === 90 || screen.orientation.angle === 270)) {
         return true;
       }
      return false;
    },

    onOrientationChange() {
      this.isLandscape() ?
        this.$el.classList.add('landscape') :
        this.$el.classList.remove('landscape');
    },

    _isExprValid() {
      return !this._isExprEndsWithNegetive() && !this._isExprEndsWithOperator();
    },

    _isExprEndsWithNegetive() {
      return this.expr.endsWith(this.NEGATIVE);
    },

    _isExprEndsWithOperator() {
      return !this._isExprEndsWithNegetive() && this.operators.indexOf(this.expr[this.expr.length - 1]) > -1;
    },

    handleEvent(event) {
      if (event.type === 'orientationchange') return this.onOrientationChange();
      if (event.type !== 'click') return;

      let target = event.target;
      switch (true) {
        case target.matches('.keybtn.dot'):
          this.onClickDot(event);
          break;
        case target.matches('.keybtn.number'):
          this.onClickNumber(event);
          break;
        case target.matches('.keybtn.operator'):
          this.onClickOperator(event);
          break;
        case target.matches('.keybtn.negative'):
          this.onClickNegative(event);
          break;
      }
    },

    onClickNumber(event) {
      let number = event.target.dataset.number;
      this.expr === '0' ? this.set(number) : this.set(this.expr + number);
    },

    onClickOperator(event) {
      let target = event.target;
      switch (true) {
        case target.matches('.clear'):
          return this.onClickClear(event);
        case target.matches('.delete'):
          return this.onClickDelete(event);
        case target.matches('.square'):
          return this.onClickSquare(event);
        case target.matches('.equal'):
          return this.onClickEqual(event);
        case target.matches('.plus'):
        case target.matches('.minus'):
        case target.matches('.divide'):
        case target.matches('.multiply'):
          return this.onClickCalcOperator(event);
      }
    },

    onClickCalcOperator(event) {
      let operator = event.target.dataset.operator;
      this._isExprEndsWithOperator() ?
        this.set(this.expr.slice(0, -1) + operator) :
        this.set(this.expr + operator);
    },

    onClickDot(event) {
      if (this.expr.endsWith('.')) return;
      if (this._isExprEndsWithOperator()) return;
      let matches = this.expr.match(/\d+\.?\d*/g);
      if (matches && matches[matches.length - 1].indexOf('.') > -1) return;

      this.set(this.expr + '.');
    },

    onClickEqual(event) {
      if (this._isExprValid()) this.set(eval(this.expr));
    },

    onClickSquare(event) {
      if (this._isExprValid()) this.set(Math.pow(eval(this.expr), 2));
    },

    onClickNegative(event) {
      this._isExprEndsWithOperator() ?
        this.set(this.expr + this.NEGATIVE) :
        this.set(-eval(this.expr));
    },

    onClickClear(event) {
      this.set('0');
    },

    onClickDelete(event) {
      this.expr.length === 1 ? this.set('0') : this.set(this.expr.slice(0, -1));
    }
  };

  calculator.init();

})();