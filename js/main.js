let start = document.getElementById('start'),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
	monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
	yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	btn = document.getElementsByTagName('button'),
	btn1 = btn[0],
	btn2 = btn[1],
	btn3 = btn[2],
	opEx = document.querySelectorAll('.optionalexpenses-item'),
	choseIncome = document.querySelector('.choose-income'),
	checkbox = document.querySelector('#savings'),
	sumValue = document.querySelector('#sum'),
	percentValue = document.querySelector('#percent'),
	year = document.querySelector('.year-value'),
	month = document.querySelector('.month-value'),
	day = document.querySelector('.day-value');



let money, time;



start.addEventListener('click', function() {	
	time = prompt('Введите дату в формате YYYY-MM-DD', '');
	money = +prompt('Ваш бюджет на месяц?', '');

	while(isNaN(money) || money == "" || money == null) {
		money = +prompt('Ваш бюджет на месяц?', '');
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	year.value = new Date(Date.parse(time)).getFullYear();
	month.value = new Date(Date.parse(time)).getMonth() + 1;
	day.value = new Date(Date.parse(time)).getDate();
});

btn1.addEventListener('click', function() {
	let sum = 0;

	for (var i = 0; i < expensesItem.length; i++) {
		let a = expensesItem[i].value,
			b = expensesItem[++i].value;
		if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
			&& a != '' && b != '' && a.length < 50) {
			console.log('done');
			appData.expenses[a] = b;
			sum += +b;
		} else {
			i = 0;
		}

	}
	expensesValue.textContent = sum;
});

btn2.addEventListener('click', function() {
    for (var i = 0; i < opEx.length; i++) {
		let c = opEx[i].value;
		appData.optionalExpenses[i] = c;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
});

btn3.addEventListener('click', function() {
	if (appData.budget != undefined) {
		appData.moneyPerDay = (appData.budget / 30).toFixed();
		dayBudgetValue.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			levelValue.textContent = 'Минимальный уровень достатка';
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = 'Средний уровень достатка';
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = 'Высокий уровень достатка';
		} else {
			levelValue.textContent = 'Произошла ошибка';
		}
	} else {
		dayBudgetValue.textContent = 'Произошла ошибка';
	}	
});

choseIncome.addEventListener('input', function() {
	let items = choseIncome.value;
	appData.income = items.split(', ');
	incomeValue.textContent = appData.income;
});

checkbox.addEventListener('click', function() {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

sumValue.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		month.textContent = appData.monthIncome.toFixed(1);
		year.textContent = appData.yearIncome.toFixed(1);
	}
});

percentValue.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

let appData = {
	budget : money,
	timeData : time,
	expenses : {},
	optionalExpenses : {},
	income : [],
	savings : false	
};