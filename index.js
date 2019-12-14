/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
    constructor() {
        this.displayValue = '0',
        this.waitingForSecondOperand = false,
        this.firstOperand = null,
        this.operator=null,
        this.performCalculation = {
            '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

            '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

            '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

            '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

            '=': (firstOperand, secondOperand) => secondOperand,
          }

    }

    handleValue(target){
      if (!target.matches('button')) {
       return;
      }

      if (target.classList.contains('operator')) {
       this.handleOperator(target.value);
       return;
      }
      
      this.inputDigit(target.value)
    }

    inputDigit(digit) { 
      if (this.waitingForSecondOperand === true) {
        this.displayValue = digit;
        this.waitingForSecondOperand = false;
      } else {
        this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
      }
    
      console.log(this);
    }


    handleOperator(nextOperator){
      const inputValue = parseFloat(this.displayValue);

      if (nextOperator === 'all-clear') {
        this._resetInput();
        return;
      }

      if(this.firstOperand == null) {
          this.firstOperand = inputValue;
      } else if (this.operator){
        

          const result = this.performCalculation[this.operator](this.firstOperand,inputValue);
  
          this.displayValue = String(result);
          this.firstOperand = result;
      }
      this.waitingForSecondOperand = true;
      this.operator = nextOperator;
      console.log(this);
    }

    _resetInput() {
      this.displayValue = '0',
      this.waitingForSecondOperand = false,
      this.firstOperand = null,
      this.operator=null
      console.log(this);
    }
  }//Model
  

/**
 * @class View
 *
 * Visual representation of the model.
 */
  class View {
    constructor() {
      this.app = this.getElement('#root')

      this.calculator = this.createElement('div','calculator')

      this.screen = this.createElement('input','calculator-screen')
      this.screen.type = "text"
      this.screen.value = ""

      this.keyScreen = this.createElement('div','calculator-keys')

      this.addButton = this.createElement('button','operator')
      this.minusButton = this.createElement('button','operator')
      this.multiplyButton = this.createElement('button','operator')
      this.divideButton = this.createElement('button','operator')

      this.SevenButton = this.createElement('button')
      this.EightButton = this.createElement('button')
      this.NineButton = this.createElement('button')


      this.FourButton = this.createElement('button')
      this.FiveButton = this.createElement('button')
      this.SixButton = this.createElement('button')

      
      this.OneButton = this.createElement('button')
      this.TwoButton = this.createElement('button')
      this.ThreeButton = this.createElement('button')

      this.ZeroButton = this.createElement('button')
      this.dotButton = this.createElement('button')
      this.clearButton = this.createElement('button','all-clear')
      this.calculateButton = this.createElement('button','equal-sign')

      //operators
      this.addButton.textContent = '+'
      this.addButton.value = '+'
      this.minusButton.textContent = '-'
      this.minusButton.value ='-'
      this.multiplyButton.textContent ='*'
      this.multiplyButton.value = '*'
      this.divideButton.textContent = '/'
      this.divideButton.value = '/'

      //Number keys
      this.NineButton.textContent = '9'
      this.NineButton.value = '9'
      this.EightButton.textContent = '8'
      this.EightButton.value= '8'
      this.SevenButton.textContent ='7'
      this.SevenButton.value = '7'
      this.SixButton.textContent = '6'
      this.SixButton.value ='6'
      this.FiveButton.textContent ='5'
      this.FiveButton.value = '5'
      this.FourButton.textContent = '4'
      this.FourButton.value = '4'
      this.ThreeButton.textContent = '3'
      this.ThreeButton.value = '3'
      this.TwoButton.textContent ='2'
      this.TwoButton.value ='2'
      this.OneButton.textContent = '1'
      this.OneButton.value = '1'
      this.ZeroButton.textContent = '0'
      this.ZeroButton.value = '0'
      this.dotButton.textContent = '.'
      this.dotButton.value = '.'
      this.clearButton.textContent = 'AC'
      this.clearButton.value = 'all-clear'
      this.calculateButton.textContent = '='
      this.calculateButton.value = '='

      //using createElement('button','equal-sign operator') throws error
      //because element.classList.add donot take spaces
      //so usign className,' operator' is added to calculateButton
      this.calculateButton.className += ' operator';
      this.clearButton.className += ' operator';

      this.keyScreen.append(this.addButton, 
                            this.minusButton,
                            this.multiplyButton,
                            this.divideButton,
                            this.NineButton,
                            this.NineButton,
                            this.EightButton,
                            this.SevenButton,
                            this.SixButton,
                            this.FiveButton,
                            this.FourButton,
                            this.ThreeButton,
                            this.TwoButton,
                            this.OneButton,
                            this.ZeroButton,
                            this.dotButton,
                            this.clearButton,
                            this.calculateButton
                            )

      this.title = this.createElement('h1')
      this.title.textContent = 'Calculator'

      this.calculator.append(this.screen,this.keyScreen)

      this.app.append(this.title,this.calculator)
    }

    
  
    // Create an element with an optional CSS class
    createElement(tag, className) {
      const element = document.createElement(tag)
      if (className) element.classList.add(className)
  
      return element
    }
  
    // Retrieve an element from the DOM
    getElement(selector) {
      const element = document.querySelector(selector)
      return element
    }

    updateDisplay(displayValue){
      const display = document.querySelector('.calculator-screen');
      display.value = displayValue;
    }

    bindUpdateDisplay(handler) {
      this.keyScreen.addEventListener('click', (event) => {
        const {target} = event;
          handler(target);
      });
    }
  }//View
  
/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
  class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view

      //Explicit this binding
      this.view.bindUpdateDisplay(this.onClickChanged)
     
    }

    onClickChanged = target => {
      this.model.handleValue(target)
      this.view.updateDisplay(this.model.displayValue)
    }

  }
  
  const app = new Controller(new Model(), new View())

