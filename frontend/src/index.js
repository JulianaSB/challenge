import './styles.css'

export const checkFormValidity = formElement => formElement.checkValidity()

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

export function Send(values) {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

export function Submit(formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      Send(getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => Alert('Your form submited error', error))
    }
  })
}

export function handleChangeRangeVehicleUnderWarranty(
  warrantyRangeElement,
  vehicleWarrantyElement
) {
  const MIN_VALUE = 12000.0
  warrantyRangeElement.addEventListener('change', function (event) {
    vehicleWarrantyElement.value =
      (Number(MIN_VALUE) * Number(event.target.value)) / 100 + Number(MIN_VALUE)
  })
}

export function handleChangeVehicleLoanAmount(
  loanAmountRangeElement,
  loanAmountElement
) {
  const MIN_VALUE = 30000.0
  loanAmountRangeElement.addEventListener('change', function (event) {
    loanAmountElement.value =
      (Number(MIN_VALUE) * Number(event.target.value)) / 100 + Number(MIN_VALUE)
  })
}

export default class CreditasChallenge {
  static initialize() {
    this.registerEvents()
  }

  static registerEvents() {
    Submit(document.querySelector('.form'))

    handleChangeRangeVehicleUnderWarranty(
      document.getElementById('valor-garantia-range'),
      document.getElementById('valor-garantia')
    )

    handleChangeVehicleLoanAmount(
      document.getElementById('valor-emprestimo-range'),
      document.getElementById('valor-emprestimo')
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})

export function onWarranty() {
  const tipoGarantia = document.getElementById("garantia").value
  const quantPrazo = document.getElementById("parcelas").value
  const veiculo = document.querySelectorAll(".veiculos");
  const imovel = document.querySelectorAll(".imoveis");
  if(tipoGarantia == 'veiculo') {          
    for (i = 0; i < 6; i++) {
      veiculo[i].style.display = "block";
      imovel[i].style.display = "none";
    }
  }else {
    for (i = 0; i < 6; i++) {
      veiculo[i].style.display = "none";
      imovel[i].style.display = "block";
    }
  }
  totalEmprestimo()
}

export function onValorGarantia(){
  const valorGarantia = document.getElementById("valor-garantia").value
  const valorEmprestimo = document.getElementById("valor-emprestimo").value
  const valorMaxGarantia = (valorGarantia * 80)/100

  if(valorEmprestimo > valorMaxGarantia) {
    alert('O valor do empréstimo não pode ser maior que 80% da garantia!!')
  }else {
    totalEmprestimo();
  }
}

export function totalEmprestimo() {
  const match = matchString => value => value.field === matchString
  const iof = 6.38 / 100
  const tipoGarantia = document.getElementById("garantia").value
  const valorDoEmprestimo = document.getElementById("valor-emprestimo").value
  const taxaDeJuros = 2.34 / 100
  const prazo = values.find(match('parcelas')).value / 1000
  const VEHICLE_LOAN_AMOUNT = values.find(match('valor-emprestimo')).value
  
  if(tipoGarantia == 'veiculo') {
    if(3000 <= valorDoEmprestimo && valorDoEmprestimo <= 100000){
        const valorTotalAPagar = (iof + taxaDeJuros + prazo + 1) * valorDoEmprestimo;
        const valorDaParcela = valorTotalAPagar / prazo
        document.getElementById("valor_total").innerText= 'R$'+ valorTotalAPagar;
        document.getElementById("valor_prazo").innerText= valorDaParcela;
        
    }else {
      return `Valor do Empréstimo tem que ser entre R$3.000 e R$100.000`
    }
  }else {
    if(30000 <= valorDoEmprestimo && valorDoEmprestimo <= 4500000){
      const valorTotalAPagar = (iof + taxaDeJuros + prazo + 1) * valorDoEmprestimo;
      const valorDaParcela = valorTotalAPagar / prazo
      document.getElementById("valor_total").innerText= 'R$'+ valorTotalAPagar;
      document.getElementById("valor_prazo").innerText= valorDaParcela;
    }else {
      return `Valor do Empréstimo tem que ser entre R$ 30.000 e R$ 4.500.000`
    }
  }
}
