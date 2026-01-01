// Seleciona os elementos do formulário 
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

//Seleciona os elementos da lista 
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")//navegando
const expenseTotal = document.querySelector("aside header h2")

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
//ADCIONA UM NOVO ITEM NA LISTA 
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
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$","")}`

    //Cria  o icone de remover 
    const removeIcons = document.createElement("img")
    removeIcons.classList.add("remove-icon")
    removeIcons.setAttribute("src","./img/remove.svg")
    removeIcons.setAttribute("alt","Remover ícone")

    
    //Adiciona as informações no item 
    expenseItem.append(expenseIcons, expenseInfo,expenseAmount,removeIcons)
    //ADCIONA O ITEM NA LISTA
    expenseList.append(expenseItem)

    //LIMPA O FORMULÁRIO PARA ADCIONAR UM NOVO ITEM ! 
    formClear()

    //ATUALIZA OS TOTAIS 
    updateTotals()

  }catch (error){
    alert("Não foi possível exibir a lista de despesas")
    console.error(error)
  }
}

//ATUALIZANDO OS TOTAIS 
function updateTotals (){
  try{
    //Recupera todos os itens (li) da lista (ul)
   const items = expenseList.children //quantos filhos tem aqui
   //ATUALIZA A QUATIDADE DE ITENS DA LISTA 
   expenseQuantity.textContent = `${items.length}  ${items.length > 1 ? "despesas" : "despesa"} `

   //Variável para incrementar o total 
   let total = 0 
   //Percorre cada item da lista 
   for(let item  = 0 ; item < items.length ; item++){
     const itemAmount = items[item].querySelector(".expense-amount")
  //Remover caracteres não numéricos e substituir a vírgula por ponto .
   let value =  itemAmount.textContent.replace(/[^\d,]/g, "").replace("," ,".")
    
   //converte o valor para float
    value = parseFloat(value)
    //verificar se é um número válido 
    if (isNaN(value)){
       alert("Não foi possível atualizar o total , o valor parece não ser um número"
      )
    }

    //increntar o total
    total += Number(value)
   }

  //criar a span par adcionar o R$ formatado 
  const symbolBRL = document.createElement("small")
  symbolBRL.textContent = "R$"

  //FORMATA O VALOR E REMOVE O R$ QUE SERÁ EXIBIDO PELA SMALL  COM O ESTILO CUSTOMIZADO.
  total = formatCurrencyBRL(total).toUpperCase().replace("R$","")
  //LIMPA O CONTEÚDO DO ELEMENTO 
  expenseTotal.innerHTML = ""
  //ADICIONA O SIMBOLO E O TOTAL FORMATADO
  expenseTotal.append(symbolBRL, total)
  
  }catch (error){
   console.log(error)
   alert ("Não foi possível atualizar os totais ")
  }
}

//EVENTO QUE CAPTURA CLIQUE NOS ITENS DA LISTA 
expenseList.addEventListener("click", function (event) {
//verificar se o elemento clicado é o ícone de remover 
if (event.target.classList.contains("remove-icon")){
  //obtém a (li) pai do ícone clicado 
  const item = event.target.closest(".expense")

  //REMOVE O ITEM DA LISTA 
  item.remove()
}

updateTotals()
})

function formClear (){
  expense.value = ""
  category.value = ""
  amount.value = ""

  expense.focus()

}