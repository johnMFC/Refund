// Seleciona os elementos do formulário 
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

//Seleciona os elementos da lista 
const expenseList = document.querySelector("ul")

//Captura o evento de input para formatar o valor
amount.oninput = () => {
//Captura o valor atual do intput e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g,"")
  //Atualiza o valor do input 
 

  //Tranformar o valor em centavos (EXEMPLO : 150/100 = 1,50)
  value = Number(value) / 100
  amount.value = formatCurrencyBRL(value)
}


function formatCurrencyBRL (value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
  return value
}

//Captura o evento de submit do formulário
form.onsubmit = (event) => {
  event.preventDefault()
  //Criando um objeto para centralizar todas as despesas 
  const newExpense = {
    id: new Date().getTime(),
    expense : expense.value,
    category_id: category.value,
    category_name:category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  
  }
  //chama a função que irá adcionar o item na lista !
  expenseAdd(newExpense)
}

function expenseAdd (newExpense){
  try{
    //Cria um elemento para adcionar o item na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    //Cria o ícone da categoria 

    const expenseIcons = document.createElement("img")
    expenseIcons.setAttribute("src",`img/${newExpense.category_id}.svg`)
    expenseIcons.setAttribute("alt",newExpense.category_name)
    //CRIA A INFO DA DESPESA
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    //CRIANDO O NOME DA DESPESA
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    //Criando a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    //adciona o nome e a categoria na div das informações da despesa

    expenseInfo.append(expenseName, expenseCategory)
    //Criando o valor da despesa 

    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<span>R$<\span>${newExpense.amount.toUpperCase().replace("R$","")}`

    
    //Adiciona as informações no item 
    expenseItem.append(expenseIcons, expenseInfo)
    //ADCIONA O ITEM NA LISTA
    expenseList.append(expenseItem)

  }catch (error){
    alert("Não foi possível exibir a lista de despesas")
    console.error(error)
  }
}